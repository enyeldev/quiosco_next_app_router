"use server";
import { prisma } from "@/src/lib/prisma";
import { ProductSchema } from "@/src/schema";

export async function createProductAction(data: unknown) {
  const result = ProductSchema.safeParse(data);

  if (!result.success) {
    console.log(result);
    
    return {
      errors: result.error.issues,
    };
  }

  const { categoryId, name, price, image } = result.data;

  try {
    await prisma.product.create({
      data: {
        name,
        price,
        categoryId,
        image,
      },
    });
  } catch (error) {
    console.log(error);
  }
}
