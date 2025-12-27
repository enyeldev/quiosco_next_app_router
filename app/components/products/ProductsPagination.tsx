import Link from "next/link";

type ProductsPaginationProps = {
  page: number;
  pageLimit: number;
};

export default function ProductsPagination({
  page,
  pageLimit,
}: ProductsPaginationProps) {
  const isLastPage = page === pageLimit;
  const isFirstPage = page === 1;
  const pages = Array.from({ length: 6 }, (_, i) => i + 1);

  return (
    <nav className="flex justify-center py-10">
      {page > 1 && (
        <Link
          href={`/admin/products?page=${page - 1}`}
          className={`${
            isFirstPage && "pointer-events-none"
          } bg-white px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus::z-20 focus:outline-offset-0`}
          aria-disabled={isFirstPage}
          tabIndex={isFirstPage ? -1 : undefined}
        >
          &laquo;
        </Link>
      )}

      <div className="flex items-center">
        {pages.map((currentPage) => (
          <Link
            href={`/admin/products?page=${currentPage}`}
            className={` ${
              page === currentPage ? "font-black bg-amber-400" : "bg-white"
            } px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus::z-20 focus:outline-offset-0`}
          >
            {currentPage}
          </Link>
        ))}
      </div>

      <Link
        href={`/admin/products?page=${page + 1}`}
        className={`${
          isLastPage && "pointer-events-none"
        } bg-white px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus::z-20 focus:outline-offset-0`}
        aria-disabled={isLastPage}
        tabIndex={isLastPage ? -1 : undefined}
      >
        &raquo;
      </Link>
    </nav>
  );
}
