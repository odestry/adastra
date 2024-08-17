/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./{assets,config,layout,locales,sections,snippets,src,templates}/**/*.{js,ts,jsx,tsx,vue,svelte,liquid,json}'],
  theme: {
    extend: {
      fontFamily: {
        heading: 'var(--font-heading-family)',
        body: 'var(--font-body-family)'
      },
      fontSize: {
        sm: ['var(--font-size-sm)', '1.428'],
        base: ['var(--font-size-base)', '1.5'],
        lg: ['var(--font-size-lg)', '1.555'],
        xl: ['var(--font-size-xl)', '1.4']
      },
      colors: {
        accent: 'hsla(var(--color-accent) / <alpha-value>)',
        surface: 'hsla(var(--color-surface) / <alpha-value>)',
        primary: 'hsla(var(--color-primary) / <alpha-value>)',
        contrast: 'hsla(var(--color-contrast) / <alpha-value>)',
        secondary: 'hsla(var(--color-secondary) / <alpha-value>)'
      },
      transitionTimingFunction: {
        wiggle: 'cubic-bezier(0.22, 1, 0.36, 1)'
      }
    }
  }
}
