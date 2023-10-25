import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";

export default function Topbar() {
  const navigate = useNavigate();

  function handleCartClick() {
    navigate("/cart");
  }

  function handleWishlistClick() {
    navigate("/wishlist");
  }

  return (
    <nav
      className="flex justify-between align-middle py-5 px-16 shadow-md"
      id="topbar"
      data-testid="topbar"
    >
      <div>
        <Link to="/" className="text-2xl font-bold uppercase">
          Ecommerce
        </Link>
      </div>
      <ul className="flex gap-3">
        <Button
          variant="contained"
          onClick={handleCartClick}
          data-testid="cart-btn"
        >
          Cart
          <span className="inline-block ms-3 rounded-full p-1 bg-white text-xs text-gray-900">
            2
          </span>
        </Button>
        <Button
          variant="contained"
          onClick={handleWishlistClick}
          data-testid="wishlist-btn"
        >
          Wishlist
          <span className="inline-block ms-3 rounded-full p-1 bg-white text-xs text-gray-900">
            4
          </span>
        </Button>
      </ul>
    </nav>
  );
}
