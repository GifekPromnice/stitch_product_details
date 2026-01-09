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

            // Add Listing
            'addListing.title': 'New Listing',
            'addListing.saveDraft': 'Save Draft',
            'addListing.coverPhoto': 'Cover Photo',
            'addListing.addPhoto': 'Add',
            'addListing.field.title': 'Title',
            'addListing.field.autoFilled': 'Auto-filled',
            'addListing.field.tags': 'Tags',
            'addListing.addTagPlaceholder': 'Add tag',
            'addListing.field.description': 'Description',
            'addListing.descriptionPlaceholder': 'Describe the condition, brand, age, and any flaws...',
            'addListing.field.price': 'Price',
            'addListing.field.category': 'Category',
            'addListing.field.condition': 'Condition',
            'addListing.field.color': 'Color',
            'addListing.field.location': 'Location',
            'addListing.locationPlaceholder': 'Zip code or Neighborhood',
            'addListing.publish': 'Publish Listing',
            'addListing.publishing': 'Publishing...',

            // Categories
            'cat.sofas': 'Sofas',
            'cat.tables': 'Tables',
            'cat.lighting': 'Lighting',
            'cat.chairs': 'Chairs',
            'cat.shelves': 'Shelves',
            'cat.rugs': 'Rugs',
            'cat.decor': 'Decor',

            // Conditions
            'cond.new': 'Like New',
            'cond.good': 'Good',
            'cond.fair': 'Fair',
            'cond.used': 'Used',

            // Colors
            'col.black': 'Black',
            'col.white': 'White',
            'col.gray': 'Gray',
            'col.beige': 'Beige',
            'col.brown': 'Brown',
            'col.red': 'Red',
            'col.blue': 'Blue',
            'col.green': 'Green',
            'col.yellow': 'Yellow',
            'col.other': 'Other',
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

            // Add Listing
            'addListing.title': 'Nowe Ogłoszenie',
            'addListing.saveDraft': 'Zapisz Szkic',
            'addListing.coverPhoto': 'Zdjęcie Główne',
            'addListing.addPhoto': 'Dodaj',
            'addListing.field.title': 'Tytuł',
            'addListing.field.autoFilled': 'Wypełniono aut.',
            'addListing.field.tags': 'Tagi',
            'addListing.addTagPlaceholder': 'Dodaj tag',
            'addListing.field.description': 'Opis',
            'addListing.descriptionPlaceholder': 'Opisz stan, markę, wiek i ewentualne wady...',
            'addListing.field.price': 'Cena',
            'addListing.field.category': 'Kategoria',
            'addListing.field.condition': 'Stan',
            'addListing.field.color': 'Kolor',
            'addListing.field.location': 'Lokalizacja',
            'addListing.locationPlaceholder': 'Kod pocztowy lub dzielnica',
            'addListing.publish': 'Opublikuj',
            'addListing.publishing': 'Publikowanie...',

            // Categories
            'cat.sofas': 'Sofy',
            'cat.tables': 'Stoły',
            'cat.lighting': 'Oświetlenie',
            'cat.chairs': 'Krzesła',
            'cat.shelves': 'Regały',
            'cat.rugs': 'Dywany',
            'cat.decor': 'Dekoracje',

            // Conditions
            'cond.new': 'Jak nowy',
            'cond.good': 'Dobry',
            'cond.fair': 'Dostateczny',
            'cond.used': 'Używany',

            // Colors
            'col.black': 'Czarny',
            'col.white': 'Biały',
            'col.gray': 'Szary',
            'col.beige': 'Beżowy',
            'col.brown': 'Brązowy',
            'col.red': 'Czerwony',
            'col.blue': 'Niebieski',
            'col.green': 'Zielony',
            'col.yellow': 'Żółty',
            'col.other': 'Inny',
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
