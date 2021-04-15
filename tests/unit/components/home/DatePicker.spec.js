/* eslint-disable no-undef */
import DatePicker from '@/components/home/DatePicker'
import { createLocalVue, mount } from '@vue/test-utils'
import VueI18n from 'vue-i18n'

describe('DatePicker.vue', () => {
  /* let vuetify

  beforeEach(() => {
    vuetify = new Vuetify()
  })

  test('should render a date picker', () => {
    function initWrapper (component) {
      const localVue = createLocalVue()
      localVue.use(VueI18n)
      const messages = {
        en: {
          datePicker: {
            from: 'from',
            to: 'to'
          }
        },
        ru: {
          datePicker: {
            from: 'с',
            to: 'по'
          }
        }
      }
      const i18n = new VueI18n({
        locale: 'ru',
        fallbackLocale: 'en',
        messages
      })
      return mount(component, {
        i18n,
        localVue,
        vuetify
      })
    }

    const wrapper = initWrapper(DatePicker)
  }) */

  describe('label', () => {
    function initWrapper (component, propsData) {
      const localVue = createLocalVue()
      localVue.use(VueI18n)
      const messages = {
        en: {
          datePicker: {
            from: 'from',
            to: 'to'
          }
        },
        ru: {
          datePicker: {
            from: 'с',
            to: 'по'
          }
        }
      }
      const i18n = new VueI18n({
        locale: 'ru',
        fallbackLocale: 'en',
        messages
      })
      return mount(component, {
        i18n,
        localVue,
        propsData
      })
    }

    test('should return "с" if isFrom prop is true', () => {
      const propsData = { isFrom: true }
      const wrapper = initWrapper(DatePicker, propsData)
      expect(wrapper.find('label').text()).toBe('с')
    })

    test('should return "по" if isFrom prop is false', () => {
      const propsData = { isFrom: false }
      const wrapper = initWrapper(DatePicker, propsData)
      expect(wrapper.find('label').text()).toBe('по')
    })
  })

  describe('textFieldClass', () => {
    test('should return mr-2 if isFrom prop is true', () => {
      const localThis = { isFrom: true }
      expect(DatePicker.computed.textFieldClass.call(localThis)).toBe('mr-2')
    })

    test('should return ml-2 if isFrom prop is false', () => {
      const localThis = { isFrom: false }
      expect(DatePicker.computed.textFieldClass.call(localThis)).toBe('ml-2')
    })
  })
})
