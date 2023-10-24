import { configureStore } from "@reduxjs/toolkit";

import { productsApi } from "./productsApi";
import { wishlistApi } from "./wishlistApi";

const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    [wishlistApi.reducerPath]: wishlistApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(productsApi.middleware)
      .concat(wishlistApi.middleware)
});

export default store;
