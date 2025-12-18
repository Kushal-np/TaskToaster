/**
 * Centralized theme configuration for the application.
 * These values can be used in Tailwind config or for CSS variables.
 */
export const ThemeConfig = {
  colors: {
    primary: {
      DEFAULT: '#4f46e5', // indigo-600
      light: '#6366f1',   // indigo-500
      dark: '#4338ca',    // indigo-700
    },
    secondary: {
      DEFAULT: '#10b981', // emerald-500
    },
    // ... other theme colors
  },
  fontFamily: {
    sans: ['Inter', 'ui-sans-serif', 'system-ui'],
    serif: ['Merriweather', 'ui-serif', 'Georgia'],
    mono: ['ui-monospace', 'SFMono-Regular'],
  },
};