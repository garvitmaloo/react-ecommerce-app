import React, { ReactElement } from "react";
import { render } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
// As a basic setup, import your same slice reducers
import { productsApi } from "../store/productsApi";

export function renderWithProviders(
  ui: ReactElement,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = configureStore({
      reducer: { [productsApi.reducerPath]: productsApi.reducer },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(productsApi.middleware),
      preloadedState
    }),
    ...renderOptions
  }: any = {}
) {
  function Wrapper({ children }: { children: React.ReactElement }) {
    return <Provider store={store}>{children}</Provider>;
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
