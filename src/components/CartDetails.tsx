import { Button } from "@mui/material";

import { useGetCartQuery } from "../store/cartApi";

export default function CartDetails() {
  const { data } = useGetCartQuery();

  const allCartItems = data ? Object.values(data) : [];

  const cartTotalQty = allCartItems?.reduce(
    (acc, item) => acc + item.quantity,
    0
  );
  const cartTotalPrice = allCartItems?.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  return (
    <section
      className="cart-details basis-96 shadow-md rounded-md p-5 self-start"
      data-testid="cart-details"
    >
      <h1 className="text-2xl font-bold mb-5">Cart Details</h1>
      <h3 className="font-semibold" data-testid="cart-total-items">
        Total Items - {allCartItems?.length}
      </h3>
      <h3 className="font-semibold" data-testid="cart-total-qty">
        Total Qty - {cartTotalQty ? cartTotalQty : 0}
      </h3>
      <h3 className="font-semibold my-5" data-testid="cart-total-amount">
        Total Amount - {cartTotalPrice ? `INR ${cartTotalPrice}` : 0}
      </h3>
      <Button variant="contained" sx={{ width: "100%" }}>
        Checkout
      </Button>
    </section>
  );
}
