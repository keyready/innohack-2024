/** @type {import('tailwindcss').Config} */

const { nextui } = require('@nextui-org/react');

module.exports = {
    important: true,
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
        './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {},
        },
    },
    darkMode: 'class',
    plugins: [nextui()],
};
