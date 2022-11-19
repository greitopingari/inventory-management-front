/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
	darkMode: 'media',
	theme: {
		extend: {
			colors: {
				primary: '#09425A',
				card: '#007C92',
				inactive: '#D0D8DA',
				active: '#00A3C6',
			},
			spacing: {
				81: '21.75rem',
				83: '22rem',
				100: '33rem',
				105: '39rem',
				110: '46.8rem',
				120: '59.813rem',
				130: '72.875rem',
			},
			width: {},
			borderColor: {
				DEFAULT: '#C4C4C4',
			},
			fill: {
				active: 'white',
				inactive: '#009ABB',
			},
			textColor: {
				primary: '#17A1C2',
				secondary: '#C4C4C4',
				button: '#009ABB',
				inactive: '#AABEC6',
			},
			borderRadius: {
				10: '0.625rem',
			},
			screens: {
				xs: { min: '300px', max: '640px' },
				...defaultTheme.screens,
			},
		},
	},
	variants: {
		extend: {
			maxHeight: ['focus'],
		},
	},
	plugins: [],
};
