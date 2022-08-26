import { Ref } from 'vue'

export interface IStatusStore {
  isLoading: Ref<boolean>,
  isVertical: Ref<boolean>,
  setIsLoading(value: boolean): void,
  setIsVertical(value: boolean): void
}
