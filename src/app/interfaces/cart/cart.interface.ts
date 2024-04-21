export interface CartDTO {
  products: CartProductDTO[]
}

export interface CartProductDTO {
  product: string;
  quantity: number;
}
