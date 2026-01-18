/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors'

export default {
    content: [
        "./index.html",
        "./*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                sans: ['Outfit', 'Inter', 'sans-serif'],
                serif: ['Playfair Display', 'serif'],
                display: ['Playfair Display', 'serif'],
            },
            colors: {
                gray: colors.zinc,
                slate: colors.zinc, // Mapping slate to zinc for consistency if used elsewhere
            }
        },
    },
    plugins: [],
}
