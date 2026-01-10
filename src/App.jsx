import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SplashScreen from './screens/SplashScreen';
import Home from './screens/Home';
import ProductDetails from './screens/ProductDetails';
import Favorites from './screens/Favorites';
import Checkout from './screens/Checkout';
import OrderConfirmation from './screens/OrderConfirmation';
import Profile from './screens/Profile';
import Wallet from './screens/Wallet';
import Features from './screens/Features';
import Auth from './screens/Auth';
import Chat from './screens/Chat';
import AddListing from './screens/AddListing';
import Negotiate from './screens/Negotiate';
import PersonalInformation from './screens/PersonalInformation';
import PasswordSecurity from './screens/PasswordSecurity';
import OrderHistory from './screens/OrderHistory';
import Layout from './components/Layout';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';

function App() {
    return (
        <Router>
            <ScrollToTop />
            <AuthProvider>
                <div className="min-h-screen bg-background-light dark:bg-background-dark font-display">
                    <Routes>
                        {/* Public Routes */}
                        <Route path="/" element={<SplashScreen />} />
                        <Route path="/features" element={<Features />} />
                        <Route path="/auth" element={<Auth />} />
                        <Route path="/home" element={<Layout><Home /></Layout>} />
                        <Route path="/product/:id" element={<ProductDetails />} />

                        {/* Protected Routes */}
                        <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
                        <Route path="/order-confirmation" element={<ProtectedRoute><OrderConfirmation /></ProtectedRoute>} />
                        <Route path="/profile" element={<ProtectedRoute><Layout><Profile /></Layout></ProtectedRoute>} />
                        <Route path="/favorites" element={<ProtectedRoute><Layout><Favorites /></Layout></ProtectedRoute>} />
                        <Route path="/wallet" element={<ProtectedRoute><Wallet /></ProtectedRoute>} />
                        <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
                        <Route path="/add-listing" element={<ProtectedRoute><AddListing /></ProtectedRoute>} />
                        <Route path="/negotiate/:id" element={<ProtectedRoute><Negotiate /></ProtectedRoute>} />
                        <Route path="/personal-information" element={<ProtectedRoute><PersonalInformation /></ProtectedRoute>} />
                        <Route path="/password-security" element={<ProtectedRoute><PasswordSecurity /></ProtectedRoute>} />
                        <Route path="/orders" element={<ProtectedRoute><OrderHistory /></ProtectedRoute>} />

                        {/* Fallback */}
                        <Route path="*" element={<div className="p-10 text-center">Screen in development</div>} />
                    </Routes>
                </div>
            </AuthProvider>
        </Router>
    );
}

export default App;
