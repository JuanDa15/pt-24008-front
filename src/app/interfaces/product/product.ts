export interface ProductDTO {
  name: string;
  price: number;
  description: string;
  stock: number;
}

export interface Product extends ProductDTO {
  _id: string;
}
