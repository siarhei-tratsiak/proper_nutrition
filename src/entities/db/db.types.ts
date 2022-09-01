export interface IConstraint {
  id?: number;
  nutrientId: number;
  min: number;
  minMutable: number;
  max: number;
  maxMutable: number;
}

export interface IFilter {
  id?: number;
  productId: number;
  selected: number;
}

export interface IRation {
  id?: number;
  date: number;
  productId: number;
  mass: number;
}
