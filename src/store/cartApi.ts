import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { CartItem } from "../types/types";

const BASE_URL =
  "https://react-ecommerce-app-d25b3-default-rtdb.firebaseio.com";

export const cartApi = createApi({
  reducerPath: "cartApi",
  tagTypes: ["cart", "products"],
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/cart.json` }),
  endpoints: (builder) => ({
    getCart: builder.query<CartItem[], void>({
      query: () => "/",
      providesTags: ["cart"]
    }),
    addProductToCart: builder.mutation<{ [key: string]: string }, CartItem>({
      query: (productDetails: CartItem) => ({
        url: "/",
        method: "POST",
        body: productDetails
      }),
      invalidatesTags: ["cart", "products"]
    }),
    removeItemFromCart: builder.mutation<null, string>({
      query: (cartItemId: string) => ({
        url: `${BASE_URL}/cart/${cartItemId}.json`,
        method: "DELETE"
      }),
      invalidatesTags: ["cart", "products"]
    }),
    changeQuantity: builder.mutation<
      void,
      { cartItemId: string; newQuantity: number }
    >({
      query: ({ cartItemId, newQuantity }) => ({
        url: `${BASE_URL}/cart/${cartItemId}.json`,
        method: "PATCH",
        body: { quantity: newQuantity }
      }),
      invalidatesTags: ["cart"]
    })
  })
});

export const {
  useGetCartQuery,
  useAddProductToCartMutation,
  useRemoveItemFromCartMutation,
  useChangeQuantityMutation
} = cartApi;
export default cartApi;
