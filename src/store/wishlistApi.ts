import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { IProduct } from "../types/types";

const BASE_URL =
  "https://react-ecommerce-app-d25b3-default-rtdb.firebaseio.com";

export const wishlistApi = createApi({
  reducerPath: "wishlistApi",
  tagTypes: ["wishlist"],
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/wishlist.json` }),
  endpoints: (builder) => ({
    getWishlist: builder.query<IProduct[], void>({
      query: () => "/",
      providesTags: ["wishlist"]
    })
  })
});

export const { useGetWishlistQuery } = wishlistApi;
