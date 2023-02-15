// prettier.config.js or .prettierrc.js
module.exports = {
  semi: false,
  singleQuote: true,
  trailingComma: 'none',
  arrowParens: 'avoid',
  bracketSameLine: true,
  overrides: [
    {
      files: '*.liquid',
      options: {
        singleQuote: false,
        singleLineLinkTags: true,
        liquidSingleQuote: false,
        plugins: [
          require('@shopify/prettier-plugin-liquid'),
          require('prettier-plugin-tailwindcss')
        ],
        parser: 'liquid-html'
      }
    }
  ]
}
