import ProductList from "@/components/products/ProductList";
import RegionPrice from "@/components/products/RegionPrice";

export const metadata = {
  title: "Products",
};

export default function ProductsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      <div className="flex flex-col gap-6">
        <div>
          <ProductList />
        </div>
        <div>
          <RegionPrice />
        </div>
      </div>
    </div>
  );
}
