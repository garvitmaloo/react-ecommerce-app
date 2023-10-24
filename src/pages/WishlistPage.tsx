import { Card, Button } from "@mui/material";

import { useGetWishlistQuery } from "../store/wishlistApi";

export default function WishlistPage() {
  const { data, isLoading, error } = useGetWishlistQuery();

  if (isLoading)
    return <h1 className="text-center text-3xl font-bold my-3">Loading...</h1>;

  if (error) {
    return (
      <h1
        className="text-center text-xl font-bold my-3"
        data-testid="error-msg"
      >
        Something went wrong ❌
      </h1>
    );
  }

  return (
    <section className="py-6 px-16">
      {data?.slice(1).map((productDetails) => (
        <Card
          className="p-3 rounded-md max-w-md cursor-pointer"
          data-testid="wishlist-product-card"
          key={productDetails.id}
        >
          <img
            src={productDetails.imageURL}
            alt={productDetails.productDescription}
            className="block rounded-md w-full h-auto object-cover aspect-[3/2]"
            width={600}
            height={600}
          />
          <h5 className="text-3xl font-bold my-3">
            {productDetails.productName}
          </h5>
          <p>INR {productDetails.price}</p>
          <div className="flex gap-3 mt-3">
            <Button variant="contained" sx={{ width: "100%" }}>
              Add To Cart
            </Button>
          </div>
        </Card>
      ))}
    </section>
  );
}
