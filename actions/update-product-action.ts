"use server";

import { prisma } from "@/src/lib/prisma";
import { ProductSchema } from "@/src/schema";

export async function updateOrderAction(data: unknown, id: number) {
  const result = ProductSchema.safeParse(data);

  if (!result.success) {
    return {
      errors: result.error.issues,
    };
  }

  const { categoryId, image, name, price } = result.data;

  try {
    await prisma.product.update({
      where: {
        id,
      },
      data: {
        categoryId,
        image,
        name,
        price,
      },
    });
  } catch (error) {
    console.log(error);
  }
}
