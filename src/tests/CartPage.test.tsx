import { screen } from "@testing-library/react";
import { rest } from "msw";

import { worker } from "../mocks/browser";
import { renderWithProviders } from "../utils/utils-for-tests";
import CartPage from "../pages/CartPage";

test("Error message should be shown if HTTP request fails", async () => {
  worker.resetHandlers(
    rest.get(
      "https://react-ecommerce-app-d25b3-default-rtdb.firebaseio.com/cart.json",
      (req, res, ctx) => {
        return res(ctx.status(404));
      }
    )
  );

  renderWithProviders(<CartPage />);

  const errorMsg = await screen.findByTestId("error-msg");
  expect(errorMsg).toBeInTheDocument();
});

test("Cart details component is rendered correctly", async () => {
  renderWithProviders(<CartPage />);

  const cartDetailsComponent = await screen.findByTestId("cart-details");
  expect(cartDetailsComponent).toBeInTheDocument();
});

test("A card is rendered for each cart item", async () => {
  renderWithProviders(<CartPage />);

  const cartItems = await screen.findAllByTestId("cart-item");
  expect(cartItems).toHaveLength(1); // length should be one because we are using Array.slice(1) in cart page
});
