import { Category } from './category';

export interface Product {
  _id: string;
  title: string;
  description: string;
  quantity: number;
  price: number;
  images: string[];
  category: Category;
  createdAt: Date;
  updatedAt: Date;
}
