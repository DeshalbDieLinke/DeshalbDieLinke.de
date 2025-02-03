import defaultTheme from 'tailwindcss/defaultTheme'
import fluid, { extract, screens, fontSize } from 'fluid-tailwind'

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: {

		files: [ './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'], 
		extract,
	},
	theme: {
    	extend: {
    		fontFamily: {
    			sans: [
    				'Inter',
                    ...defaultTheme.fontFamily.sans
                ]
    		},
    		keyframes: {
    			jitter: {
    				'0%, 40%, 60%, 100%': {
    					transform: 'translateX(0)'
    				},
    				'45%': {
    					transform: 'translateX(-5px)'
    				},
    				'55%': {
    					transform: 'translateX(5px)'
    				}
    			}
    		},
    		animation: {
    			jitter: 'jitter 1.5s ease-in-out infinite'
    		},
    		colors: {
    			primary: {
    				DEFAULT: 'hsl(var(--primary))',
    				foreground: 'hsl(var(--primary-foreground))'
    			},
    			'primary-shadow': '#500000af',
    			secondary: {
    				DEFAULT: 'hsl(var(--secondary))',
    				foreground: 'hsl(var(--secondary-foreground))'
    			},
    			tertiary: '#00b19c',
    			'tertiary-shadow': '#028d76',
    			quaternary: '#6d003b',
    			quinary: '#d4d4ff',
    			senary: '#2d4ec3',
    			'grey-background': '#f8f8f8',
    			background: 'hsl(var(--background))',
    			foreground: 'hsl(var(--foreground))',
    			card: {
    				DEFAULT: 'hsl(var(--card))',
    				foreground: 'hsl(var(--card-foreground))'
    			},
    			popover: {
    				DEFAULT: 'hsl(var(--popover))',
    				foreground: 'hsl(var(--popover-foreground))'
    			},
    			muted: {
    				DEFAULT: 'hsl(var(--muted))',
    				foreground: 'hsl(var(--muted-foreground))'
    			},
    			accent: {
    				DEFAULT: 'hsl(var(--accent))',
    				foreground: 'hsl(var(--accent-foreground))'
    			},
    			destructive: {
    				DEFAULT: 'hsl(var(--destructive))',
    				foreground: 'hsl(var(--destructive-foreground))'
    			},
    			border: 'hsl(var(--border))',
    			input: 'hsl(var(--input))',
    			ring: 'hsl(var(--ring))',
    			chart: {
    				'1': 'hsl(var(--chart-1))',
    				'2': 'hsl(var(--chart-2))',
    				'3': 'hsl(var(--chart-3))',
    				'4': 'hsl(var(--chart-4))',
    				'5': 'hsl(var(--chart-5))'
    			}
    		},
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		}
    	}
    },
	
	plugins: [
        require("tailwindcss-animate")
    ],

	daisyui: {
		themes: [
			{
				DieLinke: {
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
