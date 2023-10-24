export interface IProduct {
  id: number;
  productName: string;
  productDescription: string;
  price: number;
  imageURL: string;
}

export interface ChildrenProps {
  children: React.ReactNode;
}
