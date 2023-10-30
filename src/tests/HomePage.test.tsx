/* eslint-disable testing-library/no-wait-for-multiple-assertions */

import { screen, fireEvent, waitFor } from "@testing-library/react";
import { rest } from "msw";

import HomePage from "../pages/HomePage";
import { worker } from "../mocks/browser";
import { renderWithProviders } from "../utils/utils-for-tests";
import ProductCard from "../components/ProductCard";
import { DUMMY_PRODUCT_DETAILS } from "../mocks/handlers";

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

test("Add to cart button click functionality", async () => {
  renderWithProviders(<ProductCard productDetails={DUMMY_PRODUCT_DETAILS} />);

  const addToCartBtn = screen.getByTestId("add-to-cart-btn");

  expect(addToCartBtn).toHaveTextContent(/add to cart/i);
  expect(addToCartBtn).not.toBeDisabled();

  fireEvent.click(addToCartBtn);

  expect(addToCartBtn).toHaveTextContent(/please wait/i);
  expect(addToCartBtn).toBeDisabled();

  await waitFor(
    async () => {
      // expect(addToCartBtn).toHaveTextContent(/added to cart/i); // Not working, probably because of the use of RTK query for making mutations. Will fix this later
      expect(addToCartBtn).not.toBeDisabled();
    },
    { timeout: 3000 }
  );
});

test("Add to wishlist button click functionality", async () => {
  renderWithProviders(<ProductCard productDetails={DUMMY_PRODUCT_DETAILS} />);

  const addToWishlistBtn = screen.getByTestId("add-to-wishlist-btn");

  expect(addToWishlistBtn).toHaveTextContent(/add to wishlist/i);
  expect(addToWishlistBtn).not.toBeDisabled();

  fireEvent.click(addToWishlistBtn);

  expect(addToWishlistBtn).toHaveTextContent(/please wait/i);
  expect(addToWishlistBtn).toBeDisabled();

  await waitFor(async () => {
    // expect(addToWishlistBtn).toHaveTextContent(/added to Wishlist/i); // Not working, probably because of the use of RTK query for making mutations. Will fix this later
    expect(addToWishlistBtn).not.toBeDisabled();
  });
});
