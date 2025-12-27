import ProductCard from "@/app/components/products/ProductCard";
import Heading from "@/app/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";

type OrderPageProps = {
  params: { category: string };
};

async function getProducts(slug: string) {
  const products = await prisma.product.findMany({
    where: {
      category: {
        slug,
      },
    },
  });

  return products;
}

export default async function OrderPage({ params }: OrderPageProps) {
  const products = await getProducts(params.category);

  return (
    <>
      <Heading>Elige y personaliza tu pedido a continuacion</Heading>

      <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-4 gap-4 items-start">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
