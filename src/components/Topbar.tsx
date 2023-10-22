import Button from "@mui/material/Button";

export default function Topbar() {
  return (
    <nav
      className="flex justify-between align-middle py-5 px-16 shadow-md"
      id="topbar"
      data-testid="topbar"
    >
      <div>
        <h2 className="text-2xl font-bold uppercase">Ecommerce</h2>
      </div>
      <ul className="flex gap-3">
        <Button variant="contained">
          Cart
          <span className="inline-block ms-3 rounded-full p-1 bg-white text-xs text-gray-900">
            2
          </span>
        </Button>
        <Button variant="contained">
          Wishlist
          <span className="inline-block ms-3 rounded-full p-1 bg-white text-xs text-gray-900">
            4
          </span>
        </Button>
      </ul>
    </nav>
  );
}
