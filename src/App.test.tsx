import { render, screen } from "@testing-library/react";
import App from "./App";

test("App component is renders correctly", () => {
  render(<App />);
  const linkElement = screen.getByText(/Not starting the app/i);
  expect(linkElement).toBeInTheDocument();
});
