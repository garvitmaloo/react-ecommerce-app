import { configureStore } from "@reduxjs/toolkit";

import { productsApi } from "./productsApi";
import { wishlistApi } from "./wishlistApi";
import { cartApi } from "./cartApi";

const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    [wishlistApi.reducerPath]: wishlistApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(productsApi.middleware)
      .concat(wishlistApi.middleware)
      .concat(cartApi.middleware)
});

export default store;
