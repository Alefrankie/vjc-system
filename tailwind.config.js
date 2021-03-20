const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
  theme: {
    screens: {
      print: { raw: 'print' }
    }
  }
}
