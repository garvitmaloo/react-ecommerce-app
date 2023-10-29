import { rest } from "msw";

import { CartItem, IProduct } from "../types/types";

export const DUMMY_PRODUCT_DETAILS: IProduct = {
  id: 1000,
  productName: "Some Name",
  productDescription: "Some details",
  price: 1000,
  imageURL: "some URL text",
  inCart: false,
  inWishlist: false
};

export const DUMMY_CART_ITEM: CartItem = {
  ...DUMMY_PRODUCT_DETAILS,
  quantity: 1,
  inCart: true
};

export const handlers = [
  rest.get(
    "https://react-ecommerce-app-d25b3-default-rtdb.firebaseio.com/products.json",
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json([
          {
            id: 1,
            productName: "Product 1",
            productDescription: "Some description",
            price: 100,
            imageURL: "Some URL"
          },
          {
            id: 2,
            productName: "Product 2",
            productDescription: "Some description 2",
            price: 200,
            imageURL: "Some URL"
          },
          {
            id: 3,
            productName: "Product 3",
            productDescription: "Some description 3",
            price: 300,
            imageURL: "Some URL"
          }
        ])
      );
    }
  ),

  rest.get(
    "https://react-ecommerce-app-d25b3-default-rtdb.firebaseio.com/wishlist.json",
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json([
          {
            id: 1,
            productName: "Product 1",
            productDescription: "Some description",
            price: 100,
            imageURL: "Some URL"
          },
          {
            id: 2,
            productName: "Product 2",
            productDescription: "Some description 2",
            price: 200,
            imageURL: "Some URL"
          }
        ])
      );
    }
  ),

  rest.get(
    "https://react-ecommerce-app-d25b3-default-rtdb.firebaseio.com/cart.json",
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          id1: {
            id: 1,
            productName: "Product 1",
            productDescription: "Some description",
            price: 100,
            imageURL: "Some URL",
            quantity: 2
          },
          id2: {
            id: 2,
            productName: "Product 2",
            productDescription: "Some description 2",
            price: 200,
            imageURL: "Some URL",
            quantity: 1
          }
        })
      );
    }
  ),

  rest.post(
    "https://react-ecommerce-app-d25b3-default-rtdb.firebaseio.com/cart.json",
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json({ name: "Some id hash" }));
    }
  ),

  rest.delete(
    "https://react-ecommerce-app-d25b3-default-rtdb.firebaseio.com/cart/1000.json",
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(null));
    }
  ),

  rest.patch(
    "https://react-ecommerce-app-d25b3-default-rtdb.firebaseio.com/products/1000.json",
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json({ inCart: false }));
    }
  ),

  rest.patch(
    "https://react-ecommerce-app-d25b3-default-rtdb.firebaseio.com/products/1000.json",
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json({ quantity: 2 }));
    }
  )
];
