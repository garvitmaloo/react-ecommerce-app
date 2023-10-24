import { Button, Card } from "@mui/material";

import { useGetCartQuery } from "../store/cartApi";

export default function CartPage() {
  const { data, error, isLoading } = useGetCartQuery();

  if (isLoading)
    return <h1 className="text-center text-3xl font-bold my-3">Loading...</h1>;

  if (error)
    return (
      <h1
        className="text-center text-xl font-bold my-3"
        data-testid="error-msg"
      >
        Something went wrong ❌
      </h1>
    );

  return (
    <section className="px-16 py-5">
      <div className="flex gap-5">
        <section className="cart-items flex-grow">
          {data?.slice(1).map((productDetails) => (
            <Card
              className="p-2 rounded-md shadow-md flex gap-5 my-3"
              key={productDetails.id}
              data-testid="cart-item"
            >
              <img
                className="rounded-md object-contain aspect-square"
                src={productDetails.imageURL}
                alt={productDetails.productDescription}
                height={200}
                width={200}
              />
              <div>
                <p className="text-xl font-semibold mb-3">
                  {productDetails.productName}
                </p>
                <p className="text-slate-700">
                  Price - INR {productDetails.price}
                </p>
                <div className="my-3">
                  Quantity -
                  <Button
                    variant="outlined"
                    sx={{ marginLeft: "12px" }}
                    aria-label="Increase quantity"
                    title="Increase quantity"
                  >
                    +
                  </Button>
                  <span className="mx-2">1</span>
                  <Button
                    variant="outlined"
                    aria-label="Increase quantity"
                    title="Increase quantity"
                  >
                    -
                  </Button>
                </div>
                <div className="flex gap-3">
                  <Button variant="contained" sx={{ fontSize: "12px" }}>
                    Move to wishlist
                  </Button>
                  <Button variant="outlined" sx={{ fontSize: "12px" }}>
                    Remove from cart
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </section>

        <section
          className="cart-details basis-96 shadow-md rounded-md p-5 self-start"
          data-testid="cart-details"
        >
          <h1 className="text-2xl font-bold mb-5">Cart Details</h1>
          <h3 className="font-semibold">Total Items - 2</h3>
          <h3 className="font-semibold">Total Qty - 2</h3>
          <h3 className="font-semibold my-5">Total Amount - INR 10700</h3>
          <Button variant="contained" sx={{ width: "100%" }}>
            Checkout
          </Button>
        </section>
      </div>
    </section>
  );
}
