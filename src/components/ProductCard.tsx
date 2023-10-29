import Card from "@mui/material/Card";
import { Button } from "@mui/material";
import React from "react";

import { IProduct } from "../types/types";
import { useUpdateProductDetailsMutation } from "../store/productsApi";
import { useAddProductToCartMutation } from "../store/cartApi";

function ProductCard({ productDetails }: { productDetails: IProduct }) {
  const [addProductToCart, { isLoading }] = useAddProductToCartMutation();

  const [updateProductDetails, { isLoading: updatingProduct }] =
    useUpdateProductDetailsMutation();

  async function handleAddToCart(productDetails: IProduct) {
    if (productDetails.inCart) return;

    await addProductToCart({ ...productDetails, quantity: 1, inCart: true });
    await updateProductDetails({ ...productDetails, inCart: true });
  }

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
        <Button
          variant="contained"
          sx={{ width: "100%" }}
          onClick={() => handleAddToCart(productDetails)}
          disabled={isLoading || updatingProduct}
          data-testid="add-to-cart-btn"
        >
          {isLoading || updatingProduct
            ? "Please Wait"
            : productDetails.inCart
            ? "Added To Cart"
            : "Add To Cart"}
        </Button>
        <Button variant="contained" sx={{ width: "100%" }}>
          Add To Wishlist
        </Button>
      </div>
    </Card>
  );
}

export default React.memo(ProductCard);
