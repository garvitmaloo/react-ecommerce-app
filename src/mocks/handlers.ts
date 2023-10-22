import { rest } from "msw";

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
  )
];
