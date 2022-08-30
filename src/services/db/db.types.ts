export interface Constraints {
  id?: number;
  nutrientId: number;
  min: number;
  minMutable: number;
  max: number;
  maxMutable: number;
}

export interface Filters {
  id?: number;
  productId: number;
  selected: boolean;
}

export interface Rations {
  id?: number;
  date: string;
  productId: number;
  mass: number;
}
