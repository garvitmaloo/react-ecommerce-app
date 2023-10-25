import { screen, render, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Topbar from "../components/Topbar";

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate
}));

describe("Routing is implemented properly", () => {
  it("should navigate to cart page if cart button is clicked", () => {
    render(
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
    render(
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
