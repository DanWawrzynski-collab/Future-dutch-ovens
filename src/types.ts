export interface Product {
  id: string;
  name: string;
  series: string;
  price: number;
  description: string;
  category: string; // size
  color: string;
  image: string;
  features: string[];
}

export interface CartItem extends Product {
  quantity: number;
}
