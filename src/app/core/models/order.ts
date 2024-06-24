import { LatLng } from 'leaflet';
import { CartItem } from './CartItem';

interface OrderItem {
  product: string;
  quantity: number;
}

export class Order {
  _id: string;
  items: OrderItem[];
  totalPrice: number;
  name: string;
  address: {
    details: string;
    phone: string;
    city: string;
    postalCode: string;
  };
  isCanceled: boolean;
  addressLatLng: LatLng;
  paymentId: string;
  createdAt: string;
  status: string;
}
