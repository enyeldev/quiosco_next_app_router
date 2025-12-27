import ProductsPagination from "@/app/components/products/ProductsPagination";
import ProductsSearchFrom from "@/app/components/products/ProductsSearchFrom";
import ProductTable from "@/app/components/products/ProductTable";
import Heading from "@/app/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";

async function productCount() {
  return await prisma.product.count();
}

async function getProducts({
  skip,
  pageSize,
}: {
  skip: number;
  pageSize: number;
}) {
  const products = await prisma.product.findMany({
    include: {
      category: true,
    },
    take: pageSize,
    skip,
  });
  return products;
}

export type ProductsWithCategory = Awaited<ReturnType<typeof getProducts>>;

type ProductsPageProps = {
  searchParams: {
    page: string;
  };
};

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;
  const skip = (page - 1) * pageSize;

  if (page < 0) redirect("/admin/products");

  const [products, totalProducts] = await Promise.all([
    getProducts({ skip, pageSize }),
    productCount(),
  ]);

  const pageLimit = Math.ceil(totalProducts / 10);

  if (page > pageLimit) redirect("/admin/products");

  return (
    <>
      <Heading>Administrar Productos</Heading>

      <div className="flex flex-col gap-5 lg:flex-row lg:justify-between">
        <Link
          href={"/admin/products/new"}
          className="bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 text-center font-bold cursor-pointer"
        >
          Crear Producto
        </Link>

        <ProductsSearchFrom />
      </div>

      <ProductTable products={products} />

      <ProductsPagination page={page} pageLimit={pageLimit} />
    </>
  );
}
