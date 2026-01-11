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

            // Search
            'search.title': 'What are you looking for?',
            'search.browseByCategory': 'Browse by category',
            'search.recentSearches': 'Recent Searches',
            'search.clearAll': 'Clear all',
            'search.suggestions': 'Suggestions',
            'search.noResults': 'No products found for',
            'search.viewAll': 'View all results',

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
            'checkout.delivery.estimate': 'Estimate price',
            'checkout.delivery.time': 'Arrives by Oct 24', // Static for demo
            'checkout.delivery.distance': '15 miles away',
            'checkout.payment.card': 'Credit Card',
            'checkout.payment.payu': 'PayU',
            'checkout.payment.transfer': 'Classic Transfer',
            'checkout.payment.cod': 'Cash on Delivery',
            'checkout.title': 'Checkout',
            'checkout.shippingAddress': 'Shipping Address',
            'checkout.deliveryMethod': 'Delivery Method',
            'checkout.paymentMethod': 'Payment Method',
            'checkout.subtotal': 'Subtotal',
            'checkout.deliveryFee': 'Delivery Fee',
            'checkout.serviceFee': 'Service Fee',
            'checkout.free': 'Free',
            'checkout.address.home': 'Home',
            'checkout.address.edit': 'Edit',
            'checkout.quantity': 'Quantity',
            'checkout.totalAmount': 'Total Amount',
            'checkout.placeOrder': 'Place Order',
            'checkout.step': 'Step 2/3',

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
            'addListing.field.height': 'Height (cm)',
            'addListing.field.width': 'Width (cm)',
            'addListing.field.depth': 'Depth (cm)',
            'addListing.field.category': 'Category',
            'addListing.field.condition': 'Condition',
            'addListing.field.color': 'Color',
            'addListing.field.location': 'Location',
            'addListing.locationPlaceholder': 'Zip code or Neighborhood',
            'addListing.publish': 'Publish Listing',
            'addListing.publishing': 'Publishing...',

            // Categories
            'cat.all': 'All',
            'cat.newArrivals': 'New Arrivals',
            'cat.sofas': 'Sofas',
            'cat.tables': 'Tables',
            'cat.lighting': 'Lighting',
            'cat.chairs': 'Chairs',
            'cat.shelves': 'Shelves',
            'cat.rugs': 'Rugs',
            'cat.decor': 'Decor',
            'cat.kitchens': 'Kitchens',
            'cat.wardrobes': 'Wardrobes',
            'cat.lamps': 'Lamps',
            'cat.drawers': 'Drawers',

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

            // Product Details
            'product.height': 'Height',
            'product.width': 'Width',
            'product.depth': 'Depth',
            'product.description': 'Description',
            'product.pickupLocation': 'Pickup Location',
            'product.estimateTransport': 'Estimate Transport',
            'product.soldBy': 'Sold by',
            'product.buyNow': 'Buy Now',
            'time.ago': 'ago',
            'time.justNow': 'just now',
            // Personal Information
            'personalInfo.title': 'Personal Information',
            'personalInfo.changePhoto': 'Change Photo',
            'personalInfo.fullName': 'Full Name',
            'personalInfo.phone': 'Phone Number',
            'personalInfo.city': 'City',
            'personalInfo.bio': 'Bio',
            'personalInfo.bioOptional': 'Optional',
            'personalInfo.bioPlaceholder': 'Tell us a little about yourself...',
            'personalInfo.save': 'Save Changes',
            'personalInfo.saving': 'Saving...',

            // My Listings
            'myListings.title': 'My Listings',
            'myListings.active': 'Active',
            'myListings.sold': 'Sold',
            'myListings.loading': 'Loading your listings...',
            'myListings.noListings': 'No listings found.',
            'myListings.create': 'Create a new listing',
            'myListings.live': 'Live',
            'myListings.pending': 'Pending',
            'myListings.views': 'views',
            'myListings.observers': 'observers',
            'myListings.edit': 'Edit',
            'myListings.markSold': 'Mark Sold',
            'myListings.boost': 'Boost',
            'myListings.deleteConfirm': 'Are you sure you want to delete this listing? This cannot be undone.',
            'myListings.markSoldConfirm': 'Mark this item as sold?',
            'myListings.boostFeature': 'Boost feature coming soon!',

            // Password & Security
            'security.title': 'Password & Security',
            'security.loginMethods': 'Login Methods',
            'security.changeEmail': 'Change Email',
            'security.changePassword': 'Change Password',
            'security.updatePhone': 'Update Phone Number',
            'security.lastUpdated': 'Last updated',
            'security.securityOptions': 'Security Options',
            'security.2fa': 'Two-Factor Authentication',
            'security.2faDesc': 'Recommended for security',
            'security.biometric': 'Biometric Login',
            'security.biometricDesc': 'FaceID or TouchID',
            'security.2faDisclaimer': 'Turning on Two-Factor Authentication will require a verification code sent to your email or phone.',
            'security.newPassword': 'New Password',
            'security.confirmPassword': 'Confirm Password',
            'security.updatePassword': 'Update Password',
            'security.passwordUpdated': 'Password updated successfully',
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

            // Search
            'search.title': 'Czego szukasz?',
            'search.browseByCategory': 'Przeglądaj wg kategorii',
            'search.recentSearches': 'Ostatnie wyszukiwania',
            'search.clearAll': 'Wyczyść',
            'search.suggestions': 'Sugestie',
            'search.noResults': 'Nie znaleziono produktów dla',
            'search.viewAll': 'Zobacz wszystkie wyniki',

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

            // Personal Information
            'personalInfo.title': 'Dane Osobiste',
            'personalInfo.changePhoto': 'Zmień Zdjęcie',
            'personalInfo.fullName': 'Imię i Nazwisko',
            'personalInfo.phone': 'Numer Telefonu',
            'personalInfo.city': 'Miasto',
            'personalInfo.bio': 'O mnie',
            'personalInfo.bioOptional': 'Opcjonalne',
            'personalInfo.bioPlaceholder': 'Napisz kilka słów o sobie...',
            'personalInfo.save': 'Zapisz Zmiany',
            'personalInfo.saving': 'Zapisywanie...',

            // My Listings
            'myListings.title': 'Moje Ogłoszenia',
            'myListings.active': 'Aktywne',
            'myListings.sold': 'Sprzedane',
            'myListings.loading': 'Ładowanie ogłoszeń...',
            'myListings.noListings': 'Brak ogłoszeń.',
            'myListings.create': 'Dodaj nowe ogłoszenie',
            'myListings.live': 'Aktywne',
            'myListings.pending': 'Oczekujące',
            'myListings.views': 'wyświetleń',
            'myListings.observers': 'obserwujących',
            'myListings.edit': 'Edytuj',
            'myListings.markSold': 'Oznacz jako sprzedane',
            'myListings.boost': 'Promuj',
            'myListings.deleteConfirm': 'Czy na pewno chcesz usunąć to ogłoszenie? Tej operacji nie można cofnąć.',
            'myListings.markSoldConfirm': 'Oznaczyć przedmiot jako sprzedany?',
            'myListings.boostFeature': 'Funkcja promowania wkrótce dostępna!',

            // Password & Security
            'security.title': 'Hasło i Bezpieczeństwo',
            'security.loginMethods': 'Metody Logowania',
            'security.changeEmail': 'Zmień Email',
            'security.changePassword': 'Zmień Hasło',
            'security.updatePhone': 'Zmień Numer Telefonu',
            'security.lastUpdated': 'Ostatnia aktualizacja',
            'security.securityOptions': 'Opcje Bezpieczeństwa',
            'security.2fa': 'Uwierzytelnianie Dwuskładnikowe',
            'security.2faDesc': 'Zalecane dla bezpieczeństwa',
            'security.biometric': 'Logowanie Biometryczne',
            'security.biometricDesc': 'FaceID lub TouchID',
            'security.2faDisclaimer': 'Włączenie 2FA będzie wymagało kodu weryfikacyjnego wysłanego na email lub telefon przy logowaniu z nowego urządzenia.',
            'security.newPassword': 'Nowe Hasło',
            'security.confirmPassword': 'Potwierdź Hasło',
            'security.updatePassword': 'Zaktualizuj Hasło',
            'security.passwordUpdated': 'Hasło zostało zaktualizowane pomyślnie',

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
            'checkout.delivery.estimate': 'Szacowana cena',
            'checkout.delivery.time': 'Dostawa do 24 Paź', // Static for demo
            'checkout.delivery.distance': '15 km stąd',
            'checkout.payment.card': 'Karta Kredytowa',
            'checkout.payment.payu': 'PayU',
            'checkout.payment.transfer': 'Przelew Tradycyjny',
            'checkout.payment.cod': 'Za Pobraniem',
            'checkout.title': 'Podsumowanie',
            'checkout.shippingAddress': 'Adres Dostawy',
            'checkout.deliveryMethod': 'Metoda Dostawy',
            'checkout.paymentMethod': 'Metoda Płatności',
            'checkout.subtotal': 'Suma częściowa',
            'checkout.deliveryFee': 'Dostawa',
            'checkout.serviceFee': 'Opłata serwisowa',
            'checkout.free': 'Gratis',
            'checkout.address.home': 'Dom',
            'checkout.address.edit': 'Edytuj',
            'checkout.quantity': 'Ilość',
            'checkout.totalAmount': 'Do zapłaty',
            'checkout.placeOrder': 'Zamawiam i Płacę',
            'checkout.step': 'Krok 2/3',

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
            'addListing.field.height': 'Wysokość (cm)',
            'addListing.field.width': 'Szerokość (cm)',
            'addListing.field.depth': 'Głębokość (cm)',
            'addListing.field.category': 'Kategoria',
            'addListing.field.condition': 'Stan',
            'addListing.field.color': 'Kolor',
            'addListing.field.location': 'Lokalizacja',
            'addListing.locationPlaceholder': 'Kod pocztowy lub dzielnica',
            'addListing.publish': 'Opublikuj',
            'addListing.publishing': 'Publikowanie...',

            // Categories
            'cat.all': 'Wszystkie',
            'cat.newArrivals': 'Nowości',
            'cat.sofas': 'Sofy',
            'cat.tables': 'Stoły',
            'cat.lighting': 'Oświetlenie',
            'cat.chairs': 'Krzesła',
            'cat.shelves': 'Regały',
            'cat.rugs': 'Dywany',
            'cat.decor': 'Dekoracje',
            'cat.kitchens': 'Kuchnie',
            'cat.wardrobes': 'Szafy',
            'cat.lamps': 'Lampy',
            'cat.drawers': 'Komody',

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

            // Product Details
            'product.height': 'Wysokość',
            'product.width': 'Szerokość',
            'product.depth': 'Głębokość',
            'product.description': 'Opis',
            'product.pickupLocation': 'Miejsce Odbioru',
            'product.estimateTransport': 'Oszacuj Transport',
            'product.soldBy': 'Sprzedawane przez',
            'product.buyNow': 'Kup Teraz',
            'time.ago': 'temu',
            'time.justNow': 'przed chwilą',
        }
    };

    const t = (key) => {
        return translations[language][key] || key;
    };

    // Helper for currency formatting
    const formatPrice = (price) => {
        const numericPrice = parseFloat(price);
        if (isNaN(numericPrice)) return price;

        if (language === 'pl') {
            return `${numericPrice.toFixed(2)} zł`;
        }
        return `$${numericPrice.toFixed(2)}`;
    };

    // Helper for dimensions
    const formatDimension = (val) => {
        if (val === undefined || val === null || val === '') return '—';
        const num = parseFloat(val);
        if (isNaN(num)) return val;

        // Ensure we always have a language, default to 'pl' if missing
        const activeLang = language || 'pl';

        if (activeLang === 'pl') {
            return `${Math.round(num)} cm`;
        }

        // Conversion to inches for English
        const inches = num / 2.54;
        return `${inches.toFixed(1)}"`;
    };

    return (
        <SettingsContext.Provider value={{ theme, toggleTheme, language, toggleLanguage, t, formatPrice, formatDimension }}>
            {children}
        </SettingsContext.Provider>
    );
};
