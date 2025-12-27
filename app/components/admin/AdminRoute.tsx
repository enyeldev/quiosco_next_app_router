"use client";
import { AdminLink } from "@/src/types";
import Link from "next/link";
import { usePathname } from "next/navigation";

type AdminRouteProps = {
  link: AdminLink;
};

export default function AdminRoute({ link }: AdminRouteProps) {
  const pathname = usePathname();
  const isActive = pathname === link.url;

  return (
    <Link
      href={link.url}
      className={`font-bold text-lg border-t border-gray-200 p-3 last-of-type:border-b ${
        isActive && "bg-amber-400"
      }`}
      target={link.blank ? "_blank" : ""}
    >
      {link.text}
    </Link>
  );
}
