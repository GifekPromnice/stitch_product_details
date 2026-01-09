import React, { createContext, useState, useEffect, useContext } from 'react';

const SettingsContext = createContext();

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }) => {
    // Theme State
    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('theme') || 'light';
        }
        return 'light';
    });

    // Language State ('pl' is default)
    const [language, setLanguage] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('language') || 'pl';
        }
        return 'pl';
    });

    // Toggle Theme
    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    // Toggle Language
    const toggleLanguage = () => {
        const newLang = language === 'en' ? 'pl' : 'en';
        setLanguage(newLang);
        localStorage.setItem('language', newLang);
    };

    // Apply Theme to Document
    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(theme);
    }, [theme]);

    // Translations Dictionary
    const translations = {
        en: {
            // Navigation
            'nav.home': 'Home',
            'nav.favorite': 'Favorites',
            'nav.add': 'Add',
            'nav.inbox': 'Inbox',
            'nav.profile': 'Profile',

            // Home
            'home.searchPlaceholder': 'Search furniture...',
            'home.banner': 'Modern Furniture',
            'home.bannerSub': 'For your dream home',

            // Profile / Settings
            'profile.title': 'Settings',
            'profile.account': 'Account',
            'profile.personalInfo': 'Personal Information',
            'profile.passwordSecurity': 'Password & Security',
            'profile.paymentMethods': 'Payment Methods',
            'profile.preferences': 'Preferences',
            'profile.notifications': 'Notifications',
            'profile.darkMode': 'Dark Mode',
            'profile.language': 'Language',
            'profile.support': 'Support',
            'profile.helpCenter': 'Help Center',
            'profile.privacyPolicy': 'Privacy Policy',
            'profile.logout': 'Log Out',
            'profile.memberSince': 'Member since',

            // Favorites
            'favorites.title': 'Favorites',
            'favorites.emptyTitle': 'No favorites yet',
            'favorites.emptySub': 'Items you love will appear here.',
            'favorites.startExploring': 'Start Exploring',

            // Checkout
            'checkout.title': 'Checkout',
            'checkout.orderSummary': 'Order Summary',
            'checkout.shippingAddress': 'Shipping Address',
            'checkout.deliveryMethod': 'Delivery Method',
            'checkout.paymentMethod': 'Payment Method',
            'checkout.total': 'Total',
            'checkout.placeOrder': 'Place Order',
            'checkout.delivery.courier': 'Courier',
            'checkout.delivery.furgonetka': 'Furgonetka.pl',
            'checkout.delivery.pickup': 'Self Pickup',
            'checkout.payment.card': 'Credit Card',
            'checkout.payment.payu': 'PayU',
            'checkout.payment.transfer': 'Classic Transfer',
            'checkout.payment.cod': 'Cash on Delivery',

            // Generic
            'currency': '$',
        },
        pl: {
            // Navigation
            'nav.home': 'Główna',
            'nav.favorite': 'Ulubione',
            'nav.add': 'Dodaj',
            'nav.inbox': 'Wiadomości',
            'nav.profile': 'Profil',

            // Home
            'home.searchPlaceholder': 'Szukaj mebli...',
            'home.banner': 'Nowoczesne Meble',
            'home.bannerSub': 'Do Twojego wymarzonego domu',

            // Profile / Settings
            'profile.title': 'Ustawienia',
            'profile.account': 'Konto',
            'profile.personalInfo': 'Dane Osobiste',
            'profile.passwordSecurity': 'Hasło i Bezpieczeństwo',
            'profile.paymentMethods': 'Metody Płatności',
            'profile.preferences': 'Preferencje',
            'profile.notifications': 'Powiadomienia',
            'profile.darkMode': 'Tryb Ciemny',
            'profile.language': 'Język',
            'profile.support': 'Wsparcie',
            'profile.helpCenter': 'Centrum Pomocy',
            'profile.privacyPolicy': 'Polityka Prywatności',
            'profile.logout': 'Wyloguj',
            'profile.memberSince': 'Członek od',

            // Favorites
            'favorites.title': 'Ulubione',
            'favorites.emptyTitle': 'Brak ulubionych',
            'favorites.emptySub': 'Tu pojawią się przedmioty, które polubisz.',
            'favorites.startExploring': 'Zacznij Odkrywać',

            // Checkout
            'checkout.title': 'Podsumowanie',
            'checkout.orderSummary': 'Zamówienie',
            'checkout.shippingAddress': 'Adres Dostawy',
            'checkout.deliveryMethod': 'Metoda Dostawy',
            'checkout.paymentMethod': 'Metoda Płatności',
            'checkout.total': 'Razem',
            'checkout.placeOrder': 'Złóż Zamówienie',
            'checkout.delivery.courier': 'Kurier',
            'checkout.delivery.furgonetka': 'Furgonetka.pl',
            'checkout.delivery.pickup': 'Odbiór Osobisty',
            'checkout.payment.card': 'Karta Kredytowa',
            'checkout.payment.payu': 'PayU',
            'checkout.payment.transfer': 'Przelew Tradycyjny',
            'checkout.payment.cod': 'Za Pobraniem',

            // Generic
            'currency': 'zł',
        }
    };

    const t = (key) => {
        return translations[language][key] || key;
    };

    // Helper for currency formatting
    const formatPrice = (price) => {
        if (language === 'pl') {
            // Assuming 1 USD = 4 PLN for roughly logic, or just display raw
            // Ideally we'd convert, but for now let's just swap symbol/format
            // Simple mockup conversion
            const val = price * 4;
            return `${val.toFixed(2)} zł`;
        }
        return `$${price.toFixed(2)}`;
    };

    return (
        <SettingsContext.Provider value={{ theme, toggleTheme, language, toggleLanguage, t, formatPrice }}>
            {children}
        </SettingsContext.Provider>
    );
};
