/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,vue,svelte}', './**/*.{liquid,json}'],
  theme: {
    extend: {
      screens: {
        sm: '32em',
        md: '48em',
        lg: '64em',
        xl: '80em',
        'sm-max': {max: '48em'},
        'sm-only': {min: '32em', max: '48em'},
        'md-only': {min: '48em', max: '64em'},
        'lg-only': {min: '64em', max: '80em'},
        'xl-only': {min: '80em', max: '96em'},
      },
      fontFamily: {
        heading: 'var(--font-heading-family)',
        body: 'var(--font-body-family)',
      },
      fontSize: {
        sm: ['var(--font-size-sm)', '1.428'],
        base: ['var(--font-size-base)', '1.5'],
        lg: ['var(--font-size-lg)', '1.555'],
        xl: ['var(--font-size-xl)', '1.4'],
      },
      colors: {
        accent: 'hsla(var(--color-accent) / <alpha-value>)',
        surface: 'hsla(var(--color-surface) / <alpha-value>)',
        primary: 'hsla(var(--color-primary) / <alpha-value>)',
        contrast: 'hsla(var(--color-contrast) / <alpha-value>)',
        secondary: 'hsla(var(--color-secondary) / <alpha-value>)',
      },
      transitionTimingFunction: {
        wiggle: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
}
