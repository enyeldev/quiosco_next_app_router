import {
  Category,
  Order,
  OrderProducts,
  Product,
} from "../generated/prisma/client";

export type OrderItem = Pick<Product, "id" | "name" | "price"> & {
  quantity: number;
  subtotal: number;
};

export type AdminLink = {
  url: string;
  text: string;
  blank: boolean;
};

export type OrderWithProducts = Order & {
  orderProducts: (OrderProducts & {
    product: Product;
  })[];
};

// export type ProductsWithCategory = Product & {
//   category: Category;
// };
