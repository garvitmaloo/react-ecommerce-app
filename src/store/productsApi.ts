import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { IProduct } from "../types/types";

const BASE_URL =
  "https://react-ecommerce-app-d25b3-default-rtdb.firebaseio.com";

export const productsApi = createApi({
  reducerPath: "productsApi",
  tagTypes: ["products"],
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/products.json` }),
  endpoints: (builder) => ({
    getAllProducts: builder.query<IProduct[], void>({
      query: () => "/",
      providesTags: ["products"]
    }),
    updateProductDetails: builder.mutation<void, IProduct>({
      query: (productDetails) => ({
        url: `${BASE_URL}/products/${productDetails.id}.json`,
        body: productDetails,
        method: "PUT"
      }),
      invalidatesTags: ["products"]
    }),
    removeFromCart: builder.mutation<void, number>({
      query: (productId) => ({
        url: `${BASE_URL}/products/${productId}.json`,
        method: "PATCH",
        body: { inCart: false }
      }),
      invalidatesTags: ["products"]
    })
  })
});

export const {
  useGetAllProductsQuery,
  useUpdateProductDetailsMutation,
  useRemoveFromCartMutation
} = productsApi;
export default productsApi;
