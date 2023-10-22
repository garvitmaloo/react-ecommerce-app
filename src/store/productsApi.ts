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
    })
  })
});

export const { useGetAllProductsQuery } = productsApi;
