import Card from "@mui/material/Card";
import { Button } from "@mui/material";

import { IProduct } from "../types/types";

export default function ProductCard({
  productDetails
}: {
  productDetails: IProduct;
}) {
  return (
    <Card
      className="p-3 rounded-md max-w-md cursor-pointer"
      data-testid="product-card"
    >
      <img
        src={productDetails.imageURL}
        alt={productDetails.productDescription}
        className="block rounded-md w-full h-auto object-cover aspect-[3/2]"
        width={600}
        height={600}
      />
      <h5 className="text-3xl font-bold my-3">{productDetails.productName}</h5>
      <p>INR {productDetails.price}</p>
      <div className="flex gap-3 mt-3">
        <Button variant="contained" sx={{ width: "100%" }}>
          Add To Cart
        </Button>
        <Button variant="contained" sx={{ width: "100%" }}>
          Add To Wishlist
        </Button>
      </div>
    </Card>
  );
}
