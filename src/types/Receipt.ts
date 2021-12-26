import { Timestamp } from 'firebase/firestore';

export interface ReceiptItemProps {
  name: string;
  price: string;
}

export interface ReceiptProps {
  date: Timestamp;
  id: string;
  items: ReceiptItemProps[];
  price: string;
  store: string;
}
