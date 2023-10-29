export interface IProduct {
  id: number;
  productName: string;
  productDescription: string;
  price: number;
  imageURL: string;
  inCart: boolean;
  inWishlist: boolean;
}

export type CartItem = IProduct & { quantity: number };

export interface ICartProductCardProps {
  children?: React.ReactNode;
  cartItemId: string;
  productDetails: CartItem;
}
