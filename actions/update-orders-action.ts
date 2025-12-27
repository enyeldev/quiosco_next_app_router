"use server";

import { revalidatePath } from "next/cache";

export async function updateOrdersAction() {
  revalidatePath("/admin/orders");
}
