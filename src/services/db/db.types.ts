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
  selected: boolean;
}

export interface IRation {
  id?: number;
  date: string;
  productId: number;
  mass: number;
}
