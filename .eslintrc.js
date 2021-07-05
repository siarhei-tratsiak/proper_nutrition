module.exports = {
  env: {
    browser: true,
    es2020: true
  },

  extends: [
    'plugin:vue/essential',
    'standard'
  ],

  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module'
  },

  plugins: [
    'vue'
  ],

  rules: {
  },

  ignorePatterns: ['**/src/data/products*.js', '**/src/data/foo*.js'],

  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ]
}
