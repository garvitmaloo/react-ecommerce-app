import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { IProduct } from "../types/types";

const BASE_URL =
  "https://react-ecommerce-app-d25b3-default-rtdb.firebaseio.com";

export const wishlistApi = createApi({
  reducerPath: "wishlistApi",
  tagTypes: ["wishlist", "products"],
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/wishlist.json` }),
  endpoints: (builder) => ({
    getWishlist: builder.query<IProduct[], void>({
      query: () => "/",
      providesTags: ["wishlist"]
    }),
    addProductToWishlist: builder.mutation<{ [key: string]: string }, IProduct>(
      {
        query: (productDetails) => ({
          url: "/",
          method: "POST",
          body: productDetails
        }),
        invalidatesTags: ["wishlist", "products"]
      }
    ),
    removeFromWishlist: builder.mutation<null, string>({
      query: (wishlistItemId) => ({
        url: `${BASE_URL}/wishlist/${wishlistItemId}.json`,
        method: "DELETE"
      }),
      invalidatesTags: ["wishlist"]
    })
  })
});

export const {
  useGetWishlistQuery,
  useAddProductToWishlistMutation,
  useRemoveFromWishlistMutation
} = wishlistApi;
