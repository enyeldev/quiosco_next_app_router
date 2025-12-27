"use client";
import { Category } from "@/src/generated/prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo } from "react";

type CategoryIconProps = {
  category: Category;
};

export default function CategoryIcon({ category }: CategoryIconProps) {
  const params = useParams<{ category: string }>();

  const isActive = useMemo(
    () => category.slug === params.category,
    [params.category]
  );

  return (
    <div
      className={`flex items-center gap-4 w-full border-t border-gray-200 p-3 last-of-type:border-b transition-colors ${
        isActive && "bg-amber-400"
      }`}
    >
      <div className="relative size-16">
        <Image
          src={`/icon_${category.slug}.svg`}
          alt={`Imagen de la categoria ${category.name}`}
          fill
        />
      </div>
      <Link className="text-lg font-bold" href={`/order/${category.slug}`}>
        {category.name}
      </Link>
    </div>
  );
}
