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
import Welcome from './screens/Welcome';
import Chat from './screens/Chat';
import AddListing from './screens/AddListing';
import Negotiate from './screens/Negotiate';
import PersonalInformation from './screens/PersonalInformation';
import PasswordSecurity from './screens/PasswordSecurity';
import Layout from './components/Layout';

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-background-light dark:bg-background-dark font-display">
                <Routes>
                    <Route path="/" element={<SplashScreen />} />
                    <Route path="/features" element={<Features />} />
                    <Route path="/welcome" element={<Welcome />} />
                    <Route path="/home" element={<Layout><Home /></Layout>} />
                    <Route path="/product/:id" element={<ProductDetails />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/order-confirmation" element={<OrderConfirmation />} />
                    <Route path="/profile" element={<Layout><Profile /></Layout>} />
                    <Route path="/favorites" element={<Layout><Favorites /></Layout>} />
                    <Route path="/wallet" element={<Wallet />} />
                    <Route path="/chat" element={<Chat />} />
                    <Route path="/add-listing" element={<AddListing />} />
                    <Route path="/negotiate/:id" element={<Negotiate />} />
                    <Route path="/personal-information" element={<PersonalInformation />} />
                    <Route path="/password-security" element={<PasswordSecurity />} />
                    {/* Tu dodamy więcej ścieżek */}
                    <Route path="*" element={<div className="p-10 text-center">Screen in development</div>} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
