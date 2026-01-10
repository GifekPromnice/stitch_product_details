import { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('All Statuses');
    const [page, setPage] = useState(1);
    const itemsPerPage = 10;
    const [totalCount, setTotalCount] = useState(0);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('add');
    const [formData, setFormData] = useState({ id: '', username: '', full_name: '', email: '', role: 'customer', status: 'active' });

    // Fetch Users
    const fetchUsers = async () => {
        setLoading(true);
        try {
            let query = supabase
                .from('profiles')
                .select('*', { count: 'exact' });

            if (searchQuery) {
                query = query.or(`username.ilike.%${searchQuery}%,full_name.ilike.%${searchQuery}%,email.ilike.%${searchQuery}%`);
            }

            if (filterStatus !== 'All Statuses') {
                query = query.eq('status', filterStatus.toLowerCase());
            }

            const from = (page - 1) * itemsPerPage;
            const to = from + itemsPerPage - 1;

            const { data, count, error } = await query
                .order('created_at', { ascending: false })
                .range(from, to);

            if (error) throw error;

            setUsers(data || []);
            setTotalCount(count || 0);
        } catch (err) {
            console.error("Error fetching users:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchUsers();
        }, 300);
        return () => clearTimeout(timer);
    }, [searchQuery, filterStatus, page]);

    const deleteUser = async (id) => {
        if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) return;
        try {
            const { error } = await supabase.from('profiles').delete().eq('id', id);
            if (error) throw error;
            fetchUsers();
        } catch (err) {
            alert("Error deleting user: " + err.message);
        }
    };

    const handleOpenModal = (mode, user = null) => {
        setModalMode(mode);
        if (user) {
            setFormData({ ...user });
        } else {
            setFormData({ id: '', username: '', full_name: '', email: '', role: 'customer', status: 'active' });
        }
        setIsModalOpen(true);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (modalMode === 'edit') {
                const { error } = await supabase.from('profiles').update({
                    username: formData.username,
                    full_name: formData.full_name,
                    email: formData.email,
                    role: formData.role,
                    status: formData.status
                }).eq('id', formData.id);
                if (error) throw error;
            } else {
                // For 'add', we'd normally need to create auth user first.
                // Assuming admin just creates a profile entry or we have a trigger.
                // NOTE: Creating auth.users requires Service Role or specialized RPC.
                const { error } = await supabase.from('profiles').insert([{
                    username: formData.username,
                    full_name: formData.full_name,
                    email: formData.email,
                    role: formData.role,
                    status: formData.status
                }]);
                if (error) throw error;
            }
            setIsModalOpen(false);
            fetchUsers();
        } catch (err) {
            alert("Error saving user: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    const toggleBlock = async (user) => {
        const newStatus = user.status === 'suspended' ? 'active' : 'suspended';
        try {
            const { error } = await supabase.from('profiles').update({ status: newStatus }).eq('id', user.id);
            if (error) throw error;
            fetchUsers();
        } catch (err) {
            alert("Error toggling block: " + err.message);
        }
    };

    return (
        <div className="p-8 animate-in fade-in duration-500 relative">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
                    <p className="text-sm text-gray-500">Review and manage marketplace user accounts.</p>
                </div>
                <button
                    onClick={() => handleOpenModal('add')}
                    className="bg-[#698679] hover:bg-[#567065] text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors shadow-sm"
                >
                    <span className="material-symbols-outlined text-[18px]">person_add</span>
                    Add New User
                </button>
            </header>

            {/* Filters */}
            <section className="bg-white border border-gray-200 rounded-lg p-3 mb-6 flex flex-wrap items-center gap-3 shadow-sm">
                <div className="relative flex-1 min-w-[240px]">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
                    <input
                        className="w-full pl-10 pr-4 py-2 text-sm border-gray-200 rounded-md focus:ring-1 focus:ring-[#698679] focus:border-[#698679] border transition-all"
                        placeholder="Search by name, username or email..."
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-2">
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="text-sm border-gray-200 rounded-md focus:ring-1 focus:ring-[#698679] focus:border-[#698679] py-2 pr-10 pl-3 bg-white"
                    >
                        <option>All Statuses</option>
                        <option>Active</option>
                        <option>Suspended</option>
                    </select>
                </div>
            </section>

            {/* Table */}
            <div className="border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4 font-semibold text-gray-500 uppercase text-[11px] tracking-wider">User / ID</th>
                                <th className="px-3 py-4 font-semibold text-gray-500 uppercase text-[11px] tracking-wider">Role</th>
                                <th className="px-6 py-4 font-semibold text-gray-500 uppercase text-[11px] tracking-wider">Status</th>
                                <th className="px-6 py-4 font-semibold text-gray-500 uppercase text-[11px] tracking-wider">Join Date</th>
                                <th className="px-6 py-4 font-semibold text-gray-500 uppercase text-[11px] tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading && users.length === 0 ? (
                                <tr><td colSpan="5" className="px-6 py-12 text-center text-gray-400">
                                    <div className="flex flex-col items-center gap-2">
                                        <span className="material-symbols-outlined animate-spin">refresh</span>
                                        <span>Loading user data...</span>
                                    </div>
                                </td></tr>
                            ) : users.length === 0 ? (
                                <tr><td colSpan="5" className="px-6 py-12 text-center text-gray-400 font-medium">No users found matching your search.</td></tr>
                            ) : (
                                users.map((u) => (
                                    <tr key={u.id} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-9 h-9 rounded-md flex items-center justify-center text-xs font-bold border uppercase ${u.role === 'admin' ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-indigo-50 text-indigo-600 border-indigo-100'}`}>
                                                    {u.username ? u.username[0] : (u.full_name ? u.full_name[0] : 'U')}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-gray-900 leading-tight">{u.username || u.full_name || 'Anonymous'}</div>
                                                    <div className="text-[10px] text-gray-400 font-medium tracking-tight mt-0.5">{u.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-3 py-4">
                                            <span className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border ${u.role === 'admin' ? 'bg-purple-50 text-purple-700 border-purple-100' : 'bg-gray-50 text-gray-600 border-gray-100'}`}>
                                                {u.role || 'user'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${u.status === 'suspended' ? 'bg-red-50 text-red-700 border-red-100' : 'bg-emerald-50 text-emerald-700 border-emerald-100'}`}>
                                                {u.status || 'active'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-500 text-xs font-medium">
                                            {u.created_at ? new Date(u.created_at).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' }) : '—'}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => handleOpenModal('edit', u)}
                                                    className="p-1.5 text-gray-400 hover:text-[#698679] hover:bg-gray-50 rounded transition-all" title="Edit">
                                                    <span className="material-symbols-outlined text-[18px]">edit</span>
                                                </button>
                                                <button
                                                    onClick={() => toggleBlock(u)}
                                                    className={`p-1.5 rounded transition-all ${u.status === 'suspended' ? 'text-emerald-500 hover:bg-emerald-50' : 'text-amber-500 hover:bg-amber-50'}`}
                                                    title={u.status === 'suspended' ? 'Activate' : 'Block'}
                                                >
                                                    <span className="material-symbols-outlined text-[18px]">
                                                        {u.status === 'suspended' ? 'check_circle' : 'block'}
                                                    </span>
                                                </button>
                                                <button
                                                    onClick={() => deleteUser(u.id)}
                                                    className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-all" title="Delete"
                                                >
                                                    <span className="material-symbols-outlined text-[18px]">delete</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-500">
                        Showing {(page - 1) * itemsPerPage + 1}-{Math.min(page * itemsPerPage, totalCount)} of {totalCount} users
                    </span>
                    <div className="flex items-center gap-1">
                        <button
                            disabled={page === 1}
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            className="w-8 h-8 flex items-center justify-center rounded border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-40 transition-colors shadow-sm"
                        >
                            <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                        </button>
                        <div className="w-8 h-8 flex items-center justify-center bg-[#698679] text-white text-[11px] font-bold rounded shadow-sm">{page}</div>
                        <button
                            disabled={page * itemsPerPage >= totalCount}
                            onClick={() => setPage(p => p + 1)}
                            className="w-8 h-8 flex items-center justify-center rounded border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-40 transition-colors shadow-sm"
                        >
                            <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white rounded-lg shadow-2xl w-full max-w-md overflow-hidden border border-gray-200 animate-in zoom-in-95 duration-200">
                        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                            <h2 className="text-lg font-bold text-gray-900">{modalMode === 'add' ? 'Add New User' : 'Edit User Profile'}</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <form onSubmit={handleSave} className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500 px-1">Username</label>
                                    <input
                                        required
                                        className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-1 focus:ring-[#698679] text-sm"
                                        placeholder="jdoe"
                                        value={formData.username}
                                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500 px-1">Full Name</label>
                                    <input
                                        className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-1 focus:ring-[#698679] text-sm"
                                        placeholder="John Doe"
                                        value={formData.full_name}
                                        onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500 px-1">Email Address</label>
                                <input
                                    required
                                    type="email"
                                    className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-1 focus:ring-[#698679] text-sm"
                                    placeholder="john@example.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500 px-1">Role</label>
                                    <select
                                        className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-1 focus:ring-[#698679] text-sm bg-white"
                                        value={formData.role}
                                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                    >
                                        <option value="customer">Customer</option>
                                        <option value="admin">Administrator</option>
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500 px-1">Status</label>
                                    <select
                                        className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-1 focus:ring-[#698679] text-sm bg-white"
                                        value={formData.status}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                    >
                                        <option value="active">Active</option>
                                        <option value="suspended">Suspended</option>
                                    </select>
                                </div>
                            </div>
                            <div className="pt-4 flex gap-2">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 bg-[#698679] text-white rounded-lg text-sm font-medium hover:bg-[#567065] transition-all shadow-sm"
                                >
                                    {modalMode === 'add' ? 'Create User' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminUsers;
