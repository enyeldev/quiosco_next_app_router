"use client";
import { Product } from "@/src/generated/prisma/client";
import { useStore } from "@/src/store/store";

type AddProductsButtonProps = {
  product: Product;
};

export default function AddProductsButton({ product }: AddProductsButtonProps) {
  const { addtoCart } = useStore();

  const handleCLick = () => {
    addtoCart(product);
  };

  return (
    <button
      type="button"
      className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
      onClick={handleCLick}
    >
      Agregar
    </button>
  );
}
