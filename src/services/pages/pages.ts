import { IMenuItem, IPagesService } from './pages.types'
import { IPage } from '@/entities/page/page.types'
import { ComposerTranslation } from 'vue-i18n'

export class PagesService implements IPagesService {
  readonly pages: IPage[]
  readonly t: ComposerTranslation

  constructor (pages: IPage[], t: ComposerTranslation) {
    this.pages = pages
    this.t = t
  }

  getMenuItems (): IMenuItem[] {
    return this.pages
      .filter(page => page.title)
      .map(page => ({
        icon: page.icon,
        name: page.name,
        title: this.t(page.title || '')
      }))
  }
}
