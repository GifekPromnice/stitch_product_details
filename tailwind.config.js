export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "primary": "#698679",
                "primary-dark": "#4a6358",
                "secondary": "#f0f2f1",
                "background-light": "#FAFAF9",
                "background-dark": "#181a19",
                "surface-light": "#FFFFFF",
                "surface-dark": "#2C2E2D",
                "text-main": "#131515",
                "text-sub": "#6d7873",
            },
            fontFamily: {
                "display": ["Inter", "sans-serif"]
            },
            borderRadius: {
                "DEFAULT": "1rem",
                "lg": "1.5rem",
                "xl": "2rem",
                "2xl": "2.5rem",
                "full": "9999px"
            },
            boxShadow: {
                'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
                'float': '0 8px 30px -4px rgba(0, 0, 0, 0.1)',
            }
        },
    },
    plugins: [],
}
