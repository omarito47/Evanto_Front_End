import { LatLng } from 'leaflet';
import { CartItem } from './CartItem';

export interface Order {
  _id: string;
  items: CartItem[];
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
