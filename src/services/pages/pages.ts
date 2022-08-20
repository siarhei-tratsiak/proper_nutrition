import { IMenuItem, IPagesService } from './pages.types'
import { IPage } from '@/entities/page/page.types'
import pages from './pages.json'
import { useI18n } from 'vue-i18n'

export class PagesService implements IPagesService {
  readonly pages: IPage[] = pages

  getMenuItems (): IMenuItem[] {
    const { t } = useI18n()

    return this.pages
      .filter(page => page.title)
      .map(page => ({
        icon: page.icon,
        name: page.name,
        title: t(page.title || '')
      }))
  }
}
