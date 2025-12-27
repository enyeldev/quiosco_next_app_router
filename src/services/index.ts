import { Product } from "../generated/prisma/client";
import { OrderItem } from "../types";

type ServicesProps = {
  order: OrderItem[];
  product: Product;
  id: Product["id"];
};

export function addtoCartService({
  order,
  product,
}: Pick<ServicesProps, "order" | "product">) {
  const existInCart = order.find((item) => item.id === product.id);
  const { categoryId, image, ...data } = product;
  let items: OrderItem[] = order;

  if (existInCart) {
    const newQuantity = existInCart.quantity + 1;
    const newSubTotal = existInCart.price * newQuantity;

    items = items.map((item) =>
      item.id === product.id
        ? {
            ...item,
            quantity: newQuantity,
            subtotal: newSubTotal,
          }
        : item
    );
  } else {
    items = [...order, { ...data, quantity: 1, subtotal: 1 * product.price }];
  }

  return items;
}

export function increaseQuantityService({
  order,
  id,
}: Pick<ServicesProps, "order" | "id">) {
  return order.map((item) =>
    item.id === id
      ? {
          ...item,
          quantity: item.quantity + 1,
          subtotal: (item.quantity + 1) * item.price,
        }
      : item
  );
}

export function decreaseQuantityService({
  id,
  order,
}: Pick<ServicesProps, "id" | "order">) {
  return order.map((orderItem) =>
    orderItem.id === id
      ? {
          ...orderItem,
          quantity: orderItem.quantity - 1,
          subtotal: (orderItem.quantity - 1) * orderItem.price,
        }
      : orderItem
  );
}

export function removeItemService({
  id,
  order,
}: Pick<ServicesProps, "id" | "order">) {
  return order.filter((item) => item.id !== id);
}
