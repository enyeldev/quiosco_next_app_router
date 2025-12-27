import ProductsSearchFrom from "@/app/components/products/ProductsSearchFrom";
import ProductTable from "@/app/components/products/ProductTable";
import Heading from "@/app/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";

async function searchProducts(search: string) {
  const products = await prisma.product.findMany({
    where: {
      name: {
        contains: search,
        mode: "insensitive",
      },
    },
    include: {
      category: true,
    },
  });

  return products;
}

export default async function SearchProducts({
  searchParams,
}: {
  searchParams: { search: string };
}) {
  const products = await searchProducts(searchParams.search);

  return (
    <>
      <Heading>Resultados de busqueda: {searchParams.search}</Heading>

      <div className="flex flex-col gap-5 lg:flex-row lg:justify-end">
        <ProductsSearchFrom />
      </div>

      {products.length ? (
        <ProductTable products={products} />
      ) : (
        <p className="text-center text-lg">No hay resultados</p>
      )}
    </>
  );
}
