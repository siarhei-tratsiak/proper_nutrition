import { Ref } from 'vue'

export interface IStatusStore {
  isVertical: Ref<boolean>,
  setIsVertical(value: boolean): void
}
