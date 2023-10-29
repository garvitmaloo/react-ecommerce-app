import { useGetAllProductsQuery } from "../store/productsApi";

import ProductCard from "../components/ProductCard";

export default function HomePage() {
  const { data, isLoading, error } = useGetAllProductsQuery();

  const allProductsData = data ? Object.values(data) : [];

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
    <section className="py-5 px-16 flex gap-3 flex-wrap">
      {allProductsData
        ?.slice(1)
        .map((item) => <ProductCard key={item.id} productDetails={item} />)}
    </section>
  );
}
