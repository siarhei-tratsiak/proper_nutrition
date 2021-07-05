/* eslint-disable no-undef */
import rewire from '@/data/defaultParameters'
import { Device } from '@capacitor/device'
jest.mock('@capacitor/device', () => ({
  __esModule: true,
  Device: {
    getLanguageCode: jest.fn().mockResolvedValue({ value: 'fr-be' })
  }
}))

describe('_getLocale', () => {
  test('returns device locale', async () => {
    const _getLocale = rewire.__get__('_getLocale')
    const value = { value: 'ru-RU' }
    Device.getLanguageCode.mockResolvedValue(value)
    const language = await _getLocale()
    expect(language).toBe('ru')
  })

  test('if device locale is unknown returns "en"', async () => {
    const _getLocale = rewire.__get__('_getLocale')
    const value = { value: 'zh-cn' }
    Device.getLanguageCode.mockResolvedValue(value)
    const language = await _getLocale()
    expect(language).toBe('en')
  })
})
