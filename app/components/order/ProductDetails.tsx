import { useStore } from "@/src/store/store";
import { OrderItem } from "@/src/types";
import { formatCurrecny } from "@/src/utils";
import { PlusIcon, MinusIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { useMemo } from "react";

type ProductDetailsProps = {
  item: OrderItem;
};

const MAX_ITEMS = 5;

export default function ProductDetails({
  item,
}: Pick<ProductDetailsProps, "item">) {
  const { increaseQuantity, decreaseQuantity, removeItem } = useStore();
  const disableDecraseButton = useMemo(() => item.quantity === 1, [item]);
  const disableIncreaseButton = useMemo(
    () => item.quantity === MAX_ITEMS,
    [item]
  );

  return (
    <div className="shadow space-y-1 p-4 bg-white  border-t border-gray-200 ">
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <p className="text-xl font-bold">{item.name} </p>

          <button type="button" onClick={() => removeItem(item.id)}>
            <XCircleIcon className="text-red-600 h-8 w-8" />
          </button>
        </div>
        <p className="text-2xl text-amber-500 font-black">
          {formatCurrecny(item.price)}
        </p>
        <div className="flex gap-5 px-10 py-2 bg-gray-100 w-fit rounded-lg">
          <button
            type="button"
            disabled={disableDecraseButton}
            className="disabled:cursor-not-allowed disabled:opacity-20"
            onClick={() => decreaseQuantity(item)}
          >
            <MinusIcon className="h-6 w-6 " />
          </button>

          <p className="text-lg font-black ">{item.quantity}</p>

          <button
            type="button"
            disabled={disableIncreaseButton}
            className="disabled:cursor-not-allowed disabled:opacity-20"
            onClick={() => increaseQuantity(item.id)}
          >
            <PlusIcon className="h-6 w-6" />
          </button>
        </div>
        <p className="text-xl font-black text-gray-700">
          Subtotal: {formatCurrecny(item.subtotal)}
          <span className="font-normal"></span>
        </p>
      </div>
    </div>
  );
}
