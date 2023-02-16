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
        printWidth: 180,
        singleQuote: false,
        singleLineLinkTags: true,
        liquidSingleQuote: true,
        bracketSameLine: true,
        plugins: [
          require('@shopify/prettier-plugin-liquid'),
          require('prettier-plugin-tailwindcss')
        ],
        parser: 'liquid-html'
      }
    }
  ]
}
