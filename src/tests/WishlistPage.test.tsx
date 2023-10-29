import { screen } from "@testing-library/react";
import { rest } from "msw";

import { renderWithProviders } from "../utils/utils-for-tests";
import { worker } from "../mocks/browser";
import WishlistPage from "../pages/WishlistPage";

test("Error message is shown if HTTP request fails", async () => {
  worker.resetHandlers(
    rest.get(
      "https://react-ecommerce-app-d25b3-default-rtdb.firebaseio.com/wishlist.json",
      (req, res, ctx) => {
        return res(ctx.status(404));
      }
    )
  );

  renderWithProviders(<WishlistPage />);

  const errorMsg = await screen.findByTestId("error-msg");
  expect(errorMsg).toBeInTheDocument();
});

test("Product card is rendered for every product in the wishlist", async () => {
  renderWithProviders(<WishlistPage />);

  const productCards = await screen.findAllByTestId("wishlist-product-card");
  expect(productCards).toHaveLength(2);

  productCards.forEach((card) => {
    expect(card).toBeInTheDocument();
  });
});
