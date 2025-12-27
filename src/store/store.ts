import { create } from "zustand";
import { OrderItem } from "../types";
import { Product } from "../generated/prisma/client";
import {
  addtoCartService,
  decreaseQuantityService,
  increaseQuantityService,
  removeItemService,
} from "../services";

type Store = {
  order: OrderItem[];
  addtoCart: (item: Product) => void;
  increaseQuantity: (id: Product["id"]) => void;
  decreaseQuantity: (item: OrderItem) => void;
  removeItem: (id: Product["id"]) => void;
  clearOrder: () => void;
};

export const useStore = create<Store>((set, get) => ({
  order: [],
  addOrderItems: () => {},
  addtoCart: (product) => {
    const { order } = get();

    const items = addtoCartService({ order, product });

    set(() => ({
      order: items,
    }));
  },

  increaseQuantity: (id) => {
    set((state) => ({
      order: increaseQuantityService({ id, order: state.order }),
    }));
  },
  decreaseQuantity: (item) => {
    if (item.quantity === 1) {
      return;
    }

    set((state) => ({
      order: decreaseQuantityService({ id: item.id, order: state.order }),
    }));
  },

  removeItem: (id) => {
    set((state) => ({
      order: removeItemService({ id, order: state.order }),
    }));
  },

  clearOrder: () => {
    set(() => ({
      order: [],
    }));
  },
}));
