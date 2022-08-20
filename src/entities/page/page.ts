import { IPage } from './page.types'

export class Page implements IPage {
  readonly name: string
  readonly path: string
  readonly component: string
  readonly icon?: string
  readonly title?: string
  readonly props?: string

  constructor (page: IPage) {
    this.name = page.name
    this.path = page.path
    this.component = page.component
    this.icon = page.icon
    this.title = page.title
    this.props = page.props
  }
}
