import { Button } from "@/components/Ui/Button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
}

export function Pagination({ currentPage, totalPages, baseUrl }: Readonly<PaginationProps>) {
  if (totalPages <= 1) return null;

  const generatePageNumbers = () => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);

    if (currentPage <= 4) return [1, 2, 3, 4, 5, "...", totalPages];
    if (currentPage >= totalPages - 3) return [1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];

    return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
  };

  const pages = generatePageNumbers();

  return (
    <nav aria-label="Website pagination" className="flex items-center justify-between p-4 sm:px-0">
      <div className="-mt-px flex w-0 flex-1">
        {currentPage > 1 && (
          <Button
            variant="ghost"
            rounded
            href={`${baseUrl}?page=${currentPage - 1}`}
            className="text-gray-600 dark:text-gray-400 px-3 py-1.5"
          >
            <span aria-hidden="true">&larr;</span> Previous
          </Button>
        )}
      </div>
      <div className="hidden items-center gap-x-3.5 md:flex">
        {pages.map((page) =>
          page === "..." ? (
            <span key={crypto.randomUUID()} className="inline-flex justify-center items-center rounded-full size-8 text-sm font-medium text-gray-500">
              ...
            </span>
          ) : (
            <Button
              key={crypto.randomUUID()}
              variant="default"
              rounded
              href={`${baseUrl}?page=${page}`}
              className={`inline-flex justify-center items-center rounded-full size-7 text-sm font-medium ${
                currentPage === page ? "bg-indigo-500 text-gray-200 outline-2 outline-indigo-500 outline-offset-2" : "text-gray-600 dark:text-gray-400 hover:bg-indigo-100 dark:hover:bg-indigo-900 hover:text-indigo-700 dark:hover:text-indigo-300"
              }`}
              aria-current={currentPage === page ? "page" : undefined}
            >
              {page}
            </Button>
          )
        )}
      </div>
      <div className="-mt-px flex w-0 flex-1 justify-end">
        {currentPage < totalPages && (
          <Button
            variant="ghost"
            href={`${baseUrl}?page=${currentPage + 1}`}
            className="text-gray-600 dark:text-gray-400 px-3 py-1.5"
          >
            Next <span aria-hidden="true">&rarr;</span>
          </Button>
        )}
      </div>
    </nav>
  );
}
