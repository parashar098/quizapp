/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                brand: {
                    50: '#EFF6FF',
                    100: '#DBEAFE',
                    200: '#BFDBFE',
                    300: '#93C5FD',
                    400: '#60A5FA',
                    500: '#3B82F6',
                    600: '#2563EB',
                    700: '#1D4ED8',
                    800: '#1E40AF',
                    900: '#1E3A8A',
                },
                accent: {
                    50: '#F8FAFC',
                    100: '#F1F5F9',
                    200: '#E2E8F0',
                    300: '#CBD5E1',
                    400: '#94A3B8',
                    500: '#64748B',
                    600: '#475569',
                    700: '#334155',
                    800: '#1E293B',
                    900: '#0F172A',
                },
                surface: {
                    light: '#F8FAFC',
                    dark: '#0F172A',
                },
                text: {
                    primary: '#0F172A',
                    secondary: '#475569',
                },
                ui: {
                    border: '#E5E7EB',
                    success: '#10B981',
                    error: '#EF4444',
                    warning: '#F59E0B',
                },
            },
            fontFamily: {
                sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
                display: ['Poppins', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
                serif: ['ui-serif', 'Georgia', 'serif'],
            },
            fontSize: {
                xs: ['0.75rem', { lineHeight: '1.5' }],
                sm: ['0.875rem', { lineHeight: '1.5rem' }],
                base: ['1rem', { lineHeight: '1.75rem' }],
                lg: ['1.125rem', { lineHeight: '1.75rem' }],
                xl: ['1.25rem', { lineHeight: '1.75rem' }],
                '2xl': ['1.5rem', { lineHeight: '2rem' }],
                '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
                '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
                '5xl': ['3rem', { lineHeight: '1.2' }],
                '6xl': ['3.75rem', { lineHeight: '1.2' }],
            },
            letterSpacing: {
                tighter: '-0.05em',
                tight: '-0.025em',
                normal: '0em',
                wide: '0.025em',
                wider: '0.05em',
                widest: '0.1em',
            },
            boxShadow: {
                glass: '0 4px 12px rgba(0, 0, 0, 0.05)',
                soft: '0 4px 12px rgba(0, 0, 0, 0.05)',
                premium: '0 8px 24px rgba(0, 0, 0, 0.08)',
            },
            backgroundImage: {
                'gradient-brand': 'linear-gradient(90deg, #1E293B 0%, #334155 42%, #3B82F6 100%)',
                'gradient-surface': 'radial-gradient(circle at 15% 20%, rgba(59, 130, 246, 0.14), transparent 38%), radial-gradient(circle at 80% 0%, rgba(30, 41, 59, 0.12), transparent 32%)',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '0% 50%' },
                    '100%': { backgroundPosition: '100% 50%' },
                },
            },
            animation: {
                float: 'float 6s ease-in-out infinite',
                shimmer: 'shimmer 4s ease infinite',
            },
        },
    },
    plugins: [],
};