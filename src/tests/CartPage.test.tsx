/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import { fireEvent, screen, waitFor } from "@testing-library/react";
import { rest } from "msw";

import { worker } from "../mocks/browser";
import { renderWithProviders } from "../utils/utils-for-tests";
import CartPage from "../pages/CartPage";
import CartProductCard from "../components/CartProductCard";
import { DUMMY_CART_ITEM } from "../mocks/handlers";
import store from "../store/store";
import cartApi from "../store/cartApi";
import productsApi from "../store/productsApi";
import CartDetails from "../components/CartDetails";

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

describe("Cart details component is rendered correctly", () => {
  it("should render the main component if request succeeds", async () => {
    renderWithProviders(<CartDetails />);

    const cartDetailsComponent = await screen.findByTestId("cart-details");
    expect(cartDetailsComponent).toBeInTheDocument();
  });

  it("should display correct cart details", async () => {
    renderWithProviders(<CartDetails />);

    await waitFor(async () => {
      const cartTotalItems = await screen.findByTestId("cart-total-items");
      const cartTotalQty = await screen.findByTestId("cart-total-qty");
      const cartTotalAmount = await screen.findByTestId("cart-total-amount");

      expect(cartTotalItems).toHaveTextContent(/2/);
      expect(cartTotalQty).toHaveTextContent(/3/);
      expect(cartTotalAmount).toHaveTextContent(/400/);
    });
  });
});

test("A card is rendered for each cart item", async () => {
  renderWithProviders(<CartPage />);

  const cartItems = await screen.findAllByTestId("cart-item");
  expect(cartItems).toHaveLength(2);
});

describe("Product cards in cart page", () => {
  it("should successfully remove an item from cart", async () => {
    renderWithProviders(
      <CartProductCard productDetails={DUMMY_CART_ITEM} cartItemId="1000" />
    );

    const removeBtn = screen.getByTestId("remove-from-cart-btn");
    fireEvent.click(removeBtn);

    const deleteActionRespone = await store.dispatch(
      cartApi.endpoints.removeItemFromCart.initiate("1")
    );
    const updateProductResponse = await store.dispatch(
      productsApi.endpoints.removeFromCart.initiate(1)
    );

    expect(deleteActionRespone).toStrictEqual({ data: null });
    expect(updateProductResponse).toStrictEqual({ data: { inCart: false } });
  });

  it("should increase the quantity of cart item by one", async () => {
    renderWithProviders(
      <CartProductCard productDetails={DUMMY_CART_ITEM} cartItemId="1" />
    );

    const increaseQtyBtn = screen.getByTestId("increase-qty-btn");
    fireEvent.click(increaseQtyBtn);

    const updateQtyResponse = await store.dispatch(
      cartApi.endpoints.changeQuantity.initiate({
        cartItemId: "1",
        newQuantity: 2
      })
    );
    expect(updateQtyResponse).toStrictEqual({ data: { quantity: 2 } });
  });

  it("should decrease the quantity of cart item by one", async () => {
    renderWithProviders(
      <CartProductCard
        productDetails={{ ...DUMMY_CART_ITEM, quantity: 2 }}
        cartItemId="1"
      />
    );

    const increaseQtyBtn = screen.getByTestId("decrease-qty-btn");
    fireEvent.click(increaseQtyBtn);

    const updateQtyResponse = await store.dispatch(
      cartApi.endpoints.changeQuantity.initiate({
        cartItemId: "1",
        newQuantity: 1
      })
    );
    expect(updateQtyResponse).toStrictEqual({ data: { quantity: 1 } });
  });

  it("should render snackbar if quntity is not appropriate", async () => {
    renderWithProviders(
      <CartProductCard productDetails={DUMMY_CART_ITEM} cartItemId="1" />
    );

    const decreaseQtyBtn = screen.getByTestId("decrease-qty-btn");
    fireEvent.click(decreaseQtyBtn);

    const snackbar = await screen.findByTestId("snackbar");
    expect(snackbar).toBeInTheDocument();
  });
});
