import defaultTheme from 'tailwindcss/defaultTheme'
import fluid, { extract, screens, fontSize } from 'fluid-tailwind'
import daisyui from "daisyui"

/** @type {import('tailwindcss').Config} */
export default {
	content: {

		files: [ './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'], 
		extract,
	},
	theme: {
		screens,
		fontSize,
		extend: {
			fontFamily: {
				sans: ['Inter', ...defaultTheme.fontFamily.sans],
			},
			keyframes: {
				jitter: {
					'0%, 40%, 60%, 100%': { transform: 'translateX(0)' }, // Extended pause at 0 position
					'45%': { transform: 'translateX(-5px)' },
					'55%': { transform: 'translateX(5px)' },
				},
			},
			animation: {
				jitter: 'jitter 1.5s ease-in-out infinite',
			},
			colors: {
				'primary': '#ff0000', // Rot
    			'primary-shadow': '#500000af', // Rot
   				'secondary':'#004b5b', // Marine
    			'tertiary': '#00b19c', // 
				'tertiary-shadow':'#028d76',
				'quaternary':'#6d003b',
				'quinary':'#d4d4ff',
				'senary':'#2d4ec3',
				'grey-background': '#f8f8f8',
			},
		},
	},
	
	plugins: [
		fluid,
		daisyui,
	],

	daisyui: {
		themes: [
			{
				DieLinke: {
					"primary": "#FF0000",
					"secondary": "#6F003C",
					"tertiary": "#00B19C",
					"quaternary": "#8100A1",
					"quinary": "#D675D8",
					"senary": "#2E4FC4",
					"light-blue": "#D4D4FF",
					"accent": "#FF0000",
					"neutral": "#6F003C",
					"base-100": "FFFFFF",
					"info": "#6F003C",
					"success": "#D4D4FF",

					// Not set properly,
					"warning": "#FF0000",
					"error": "#8100A1",
				}
			}
		],
	},
}
