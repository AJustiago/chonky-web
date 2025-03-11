export interface Product {
  id?: string;
  name: string;
  colorways: string[];
  description?: string;
  images: string[];
  price: number;
  quantity: number;
  functionEnabled?: boolean;
}
