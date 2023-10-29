import { useGetCartQuery } from "../store/cartApi";
import CartDetails from "../components/CartDetails";
import CartProductCard from "../components/CartProductCard";

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

  const allCartItems = data ? Object.entries(data) : [];

  return (
    <section className="px-16 py-5">
      <div className="flex gap-5">
        <section className="cart-items flex-grow">
          {allCartItems.map((productDetails) => (
            <CartProductCard
              key={productDetails[0]}
              productDetails={productDetails[1]}
              cartItemId={productDetails[0]}
            />
          ))}
        </section>

        <CartDetails />
      </div>
    </section>
  );
}
