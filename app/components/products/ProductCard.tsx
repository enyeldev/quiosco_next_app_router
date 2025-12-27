import { Product } from "@/src/generated/prisma/client";
import { formatCurrecny, getImagePath } from "@/src/utils";
import Image from "next/image";
import AddProductsButton from "./AddProductsButton";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="border bg-white">
      <Image
        src={getImagePath(product.image)}
        alt={`Imagen platillo ${product.name}`}
        width={400}
        height={500}
      />

      <div className="p-5 ">
        <h3 className="text-2xl font-bold">{product.name}</h3>
        <p className="mt-5 font-black text-4xl text-amber-500">
          {formatCurrecny(product.price)}
        </p>
      </div>
      <AddProductsButton product={product} />
    </div>
  );
}
