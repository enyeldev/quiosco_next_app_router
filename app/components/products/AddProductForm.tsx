"use client";
import { createProductAction } from "@/actions/create-product-action";
import { ProductSchema } from "@/src/schema";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { toast } from "react-toastify";

export default function AddProductForm({ children }: { children: ReactNode }) {
  const router = useRouter();
  const handleSubmit = async (formData: FormData) => {
    const data = {
      name: formData.get("name"),
      price: formData.get("price"),
      categoryId: formData.get("categoryId"),
      image: formData.get("image"),
    };

    console.log(data);

    const result = ProductSchema.safeParse(data);
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        console.log(result);

        toast.error(issue.message);
      });

      return;
    }

    // Save new product
    const response = await createProductAction(data);

    if (response?.errors) {
      response.errors.forEach((error) => {
        toast.error(error.message);
      });

      return;
    }

    toast.success("Producto creado");
    router.push("/admin/products");
  };

  return (
    <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md max-w-3xl mx-auto">
      <form action={handleSubmit} className="space-y-5">
        {children}

        <input
          type="submit"
          value={"Registrar producto"}
          className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
        />
      </form>
    </div>
  );
}
