import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IProduct } from "../types/types";

const BASE_URL =
  "https://react-ecommerce-app-d25b3-default-rtdb.firebaseio.com";

export const cartApi = createApi({
  reducerPath: "cartApi",
  tagTypes: ["cart"],
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/cart.json` }),
  endpoints: (builder) => ({
    getCart: builder.query<IProduct[], void>({
      query: () => "/",
      providesTags: ["cart"]
    })
  })
});

export const { useGetCartQuery } = cartApi;
