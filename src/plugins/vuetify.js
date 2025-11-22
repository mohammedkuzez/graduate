/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

import colors from 'vuetify/util/colors'

const currentTheme = localStorage.getItem('theme') || 'light'

import i18n from './i18n'
import { useI18n } from 'vue-i18n'

import { createVueI18nAdapter } from 'vuetify/locale/adapters/vue-i18n'


// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  locale: {
    adapter: createVueI18nAdapter({ i18n, useI18n })
  },

  theme: {
    
    defaultTheme: currentTheme,

    themes: {
      light: {
        dark: false,
        colors: {
          background: '#ade8f4',
          surface: '#ade8f4',
          primary: '#023e8a',
          'primary-darken-1': '#48cae4',
          secondary: '#00b4d8',
          'secondary-darken-1': '#018786',
          error: '#B00020',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FB8C00',
        },
      },
      dark: {
        dark: true,
        colors: {
          background: '#023e8a',
          surface: '#023e8a',
          primary: '#90e0ef',
          'primary-darken-1': '#48cae4',
          secondary: '#00b4d8',
          'secondary-darken-1': '#03DAC6',
          error: '#CF6679',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FB8C00',
        },
      },
    }
  },
})




