import { fcnnlsVector } from 'ml-fcnnls'

export default class SolveService {
  private A: number[][]
  private b: number[]

  constructor (A: number[][], b: number[]) {
    this.A = A
    this.b = b
  }

  solve (): number[] {
    return fcnnlsVector(this.A, this.b)
  }
}
