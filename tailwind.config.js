/** @type {import('tailwindcss').Config} */
export default {
  content: [
      "./src/**/*.{js,jsx,ts,tsx}",
  ],
    theme: {
        extend: {
            colors: {
                primary: '#3CAFAE', // The teal/cyan color
                secondary: '#005F80', // The dark blue
                dark: '#1a1a1a',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'], // Ensure you have a clean font loaded
            }
        },
    },
  plugins: [],
}

