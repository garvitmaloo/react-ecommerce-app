import { screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import App from "../App";
import { renderWithProviders } from "../utils/utils-for-tests";

test("App component renders correctly", () => {
  renderWithProviders(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  const linkElement = screen.getByTestId("topbar");
  expect(linkElement).toBeInTheDocument();
});
