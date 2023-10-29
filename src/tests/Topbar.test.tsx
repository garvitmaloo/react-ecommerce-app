import { screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Topbar from "../components/Topbar";
import { renderWithProviders } from "../utils/utils-for-tests";

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate
}));

describe("Routing is implemented properly", () => {
  it("should navigate to cart page if cart button is clicked", () => {
    renderWithProviders(
      <MemoryRouter>
        <Topbar />
      </MemoryRouter>
    );

    const cartBtn = screen.getByTestId("cart-btn");
    fireEvent.click(cartBtn);

    expect(mockedUsedNavigate).toHaveBeenCalledWith("/cart");
    mockedUsedNavigate.mockRestore();
  });

  it("should navigate to wishlist page if wishlist button is clicked", () => {
    renderWithProviders(
      <MemoryRouter>
        <Topbar />
      </MemoryRouter>
    );

    const wishlistBtn = screen.getByTestId("wishlist-btn");
    fireEvent.click(wishlistBtn);

    expect(mockedUsedNavigate).toHaveBeenCalledWith("/wishlist");
    mockedUsedNavigate.mockRestore();
  });
});

test("Cart button displays correct number of items in the cart", async () => {
  renderWithProviders(
    <MemoryRouter>
      <Topbar />
    </MemoryRouter>
  );

  await waitFor(async () => {
    const cartBtn = await screen.findByTestId("cart-btn");
    expect(cartBtn).toHaveTextContent(/3/);
  });
});
