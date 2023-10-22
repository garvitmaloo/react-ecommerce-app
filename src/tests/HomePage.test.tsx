import { screen } from "@testing-library/react";
import { rest } from "msw";

import HomePage from "../pages/HomePage";
import { worker } from "../mocks/browser";
import { renderWithProviders } from "../utils/utils-for-tests";

test("Error message is shown if HTTP request fails", async () => {
  worker.resetHandlers(
    rest.get(
      "https://react-ecommerce-app-d25b3-default-rtdb.firebaseio.com/products.json",
      (req, res, ctx) => {
        return res(ctx.status(404));
      }
    )
  );
  renderWithProviders(<HomePage />);

  const errorMsg = await screen.findByTestId("error-msg");
  expect(errorMsg).toBeInTheDocument();
});

test("Product cards are rendered if product data is fetched successfully", async () => {
  renderWithProviders(<HomePage />);

  const productCard = await screen.findAllByTestId("product-card");
  expect(productCard).toHaveLength(2);
});
