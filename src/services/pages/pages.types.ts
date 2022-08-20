import { IPage } from '@/entities/page/page.types'

export interface IMenuItem {
  icon?: string;
  name: string;
  title?: string;
}

export interface IPagesService {
  pages: IPage[]
  getMenuItems (): IMenuItem[]
}
