import { screen, fireEvent } from "@testing-library/react";
import { rest } from "msw";

import HomePage from "../pages/HomePage";
import { worker } from "../mocks/browser";
import { renderWithProviders } from "../utils/utils-for-tests";
import ProductCard from "../components/ProductCard";
import { DUMMY_PRODUCT_DETAILS } from "../mocks/handlers";
import store from "../store/store";
import cartApi from "../store/cartApi";
import productsApi from "../store/productsApi";

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

describe("Add to cart button click functionality", () => {
  it("should make a successful HTTP POST request to the cart endpoint", async () => {
    renderWithProviders(<ProductCard productDetails={DUMMY_PRODUCT_DETAILS} />);

    const addToCartBtn = screen.getByTestId("add-to-cart-btn");
    fireEvent.click(addToCartBtn);

    const postReqResponse = await store.dispatch(
      cartApi.endpoints.addProductToCart.initiate({
        ...DUMMY_PRODUCT_DETAILS,
        quantity: 1
      })
    );
    const updateProductResponse = await store.dispatch(
      productsApi.endpoints.updateProductDetails.initiate({
        ...DUMMY_PRODUCT_DETAILS,
        inCart: true
      })
    );

    expect(postReqResponse).toStrictEqual({ data: { name: "Some id hash" } });
    expect(updateProductResponse).toStrictEqual({
      data: { ...DUMMY_PRODUCT_DETAILS, inCart: true }
    });
  });
});
