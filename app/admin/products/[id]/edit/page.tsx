import EditProductForm from "@/app/components/products/EditProductForm";
import ProductForm from "@/app/components/products/ProductForm";
import GoBackButton from "@/app/components/ui/GoBackButton";
import Heading from "@/app/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

async function getProductBy(id: number) {
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });

  if (!product) {
    notFound();
  }

  return product;
}

export default async function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  const productId = parseInt(params.id);

  const product = await getProductBy(productId);

  return (
    <>
      <Heading>Editar Producto {product.name}</Heading>
      <GoBackButton />
      <EditProductForm productId={productId}>
        <ProductForm product={product} />
      </EditProductForm>
    </>
  );
}
