export interface IProduct {
  _id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
}
