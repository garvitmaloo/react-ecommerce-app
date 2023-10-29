import React, { useState } from "react";
import { Button, Card } from "@mui/material";
import { Snackbar, SnackbarOrigin } from "@mui/material";

import { ICartProductCardProps } from "../types/types";
import {
  useChangeQuantityMutation,
  useRemoveItemFromCartMutation
} from "../store/cartApi";
import { useRemoveFromCartMutation } from "../store/productsApi";

interface ISnackbarState extends SnackbarOrigin {
  open: boolean;
}

const CartProductCard: React.FC<ICartProductCardProps> = ({
  productDetails,
  cartItemId
}) => {
  const [{ open, vertical, horizontal }, setSnackbarState] =
    useState<ISnackbarState>({
      open: false,
      vertical: "top",
      horizontal: "center"
    });

  const [removeItemFromCart, { isLoading: disableButton }] =
    useRemoveItemFromCartMutation();
  const [changeQuantity, { isLoading: disableIconButton }] =
    useChangeQuantityMutation();
  const [removeFromCart] = useRemoveFromCartMutation();

  async function handleRemoveFromCart(cartItemId: string, productId: number) {
    await removeItemFromCart(cartItemId);
    await removeFromCart(productId);
  }

  async function changeQuantityHandler(
    cartItemId: string,
    quantity: number,
    type: "INC" | "DEC"
  ) {
    if (
      (quantity === 1 && type === "DEC") ||
      (quantity === 5 && type === "INC")
    ) {
      setSnackbarState((state) => ({ ...state, open: true }));
      return;
    }
    await changeQuantity({
      cartItemId,
      newQuantity: type === "INC" ? quantity + 1 : quantity - 1
    });
  }

  return (
    <>
      <Card
        className="p-2 rounded-md shadow-md flex gap-5 my-3"
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
          <p className="text-slate-700">Price - INR {productDetails.price}</p>
          <div className="my-3">
            Quantity -
            <Button
              variant="outlined"
              aria-label="Increase quantity"
              title="Increase quantity"
              sx={{ marginLeft: "12px" }}
              onClick={() =>
                changeQuantityHandler(
                  cartItemId,
                  productDetails.quantity,
                  "INC"
                )
              }
              disabled={disableIconButton}
              data-testid="increase-qty-btn"
            >
              +
            </Button>
            <span className="mx-2">{productDetails.quantity}</span>
            <Button
              variant="outlined"
              aria-label="Decrease quantity"
              title="Decrease quantity"
              onClick={() =>
                changeQuantityHandler(
                  cartItemId,
                  productDetails.quantity,
                  "DEC"
                )
              }
              disabled={disableIconButton}
              data-testid="decrease-qty-btn"
            >
              -
            </Button>
          </div>
          <div className="flex gap-3">
            <Button variant="contained" sx={{ fontSize: "12px" }}>
              Move to wishlist
            </Button>
            <Button
              variant="outlined"
              onClick={() =>
                handleRemoveFromCart(cartItemId, productDetails.id)
              }
              disabled={disableButton}
              data-testid="remove-from-cart-btn"
            >
              Remove from Cart
            </Button>
          </div>
        </div>
      </Card>
      <Snackbar
        open={open}
        anchorOrigin={{ vertical, horizontal }}
        message="Quantity should be between 1 and 5"
        onClose={() => setSnackbarState((state) => ({ ...state, open: false }))}
        autoHideDuration={350}
        data-testid="snackbar"
      />
    </>
  );
};

export default React.memo(CartProductCard);
