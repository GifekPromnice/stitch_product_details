import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/auth" replace />;
    }

    // Support both wrapper usage and Layout Route usage
    return children ? children : <Outlet />;
};

export default ProtectedRoute;
