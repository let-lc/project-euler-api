module.exports = {
  printWidth: 120,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  quoteProps: 'as-needed',
  jsxSingleQuote: false,
  trailingComma: 'es5',
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: 'always',
  endOfLine: 'lf',
  "overrides": [
    {
      "files": ["*.ts", "*.js"],
      "options": {
        printWidth: 80,
      }
    },
  ],
  plugins: [require('prettier-plugin-tailwindcss')],
};
