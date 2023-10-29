import { Card, Button } from "@mui/material";

import {
  useGetWishlistQuery,
  useRemoveFromWishlistMutation
} from "../store/wishlistApi";
import { useUpdateProductDetailsMutation } from "../store/productsApi";
import { IProduct } from "../types/types";

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

  const allWishlistItems = data ? Object.entries(data) : [];

  return (
    <section className="py-6 px-16 flex gap-3 flex-wrap">
      {allWishlistItems.length === 0 && (
        <h1 className="text-2xl text-center font-semibold">
          Wishlist is empty
        </h1>
      )}
      {allWishlistItems.map((productDetails) => (
        <Card
          className="p-3 rounded-md max-w-md cursor-pointer"
          data-testid="wishlist-product-card"
          key={productDetails[1].id}
        >
          <img
            src={productDetails[1].imageURL}
            alt={productDetails[1].productDescription}
            className="block rounded-md w-full h-auto object-cover aspect-[3/2]"
            width={600}
            height={600}
          />
          <h5 className="text-3xl font-bold my-3">
            {productDetails[1].productName}
          </h5>
          <p>INR {productDetails[1].price}</p>
          <div className="flex gap-3 mt-3">
            <RemoveButton
              wishlistItemId={productDetails[0]}
              productDetails={productDetails[1]}
            />
          </div>
        </Card>
      ))}
    </section>
  );
}

function RemoveButton(props: {
  wishlistItemId: string;
  productDetails: IProduct;
  children?: React.ReactNode;
}) {
  const [removeFromWishlist, { isLoading }] = useRemoveFromWishlistMutation();

  const [updateProduct] = useUpdateProductDetailsMutation();

  async function handleClick() {
    await removeFromWishlist(props.wishlistItemId);
    await updateProduct({ ...props.productDetails, inWishlist: false });
  }

  return (
    <Button
      variant="contained"
      sx={{ width: "100%" }}
      disabled={isLoading}
      onClick={handleClick}
    >
      {isLoading ? "Please Wait" : "Remove from Wishlist"}
    </Button>
  );
}
