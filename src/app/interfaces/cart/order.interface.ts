export interface Order {
  user: User;
  products: ProductElement[];
  totalPrice: number;
  status: string;
  _id: string;
  created: Date;
}

export interface ProductElement {
  product: ProductProduct;
  quantity: number;
  _id?: string;
}

export interface ProductProduct {
  _id: string;
  name: string;
  price: number;
  description: string;
  stock: number;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  type: string;
}
