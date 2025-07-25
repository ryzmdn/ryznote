"use client";

import {
  ChangeEvent,
  forwardRef,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/common/Button";
import { Time } from "@/components/common/Time";
import { Svg } from "@/components/common/Svg";
import { formatDate } from "@/utils/fotmatDate";
import { clss } from "@/utils/clss";
import { convertEncode } from "@/utils/encode";
import { Post } from "@/types/wordpress";

enum SearchStatus {
  Idle = "idle",
  Loading = "loading",
  Success = "success",
  Error = "error",
}

interface WordPressSearchState {
  query: string;
  results: Post[];
  isOpen: boolean;
  status: SearchStatus;
}

function useWordPressSearch({ close }: { close: () => void }) {
  const router = useRouter();
  const [searchState, setSearchState] = useState<WordPressSearchState>({
    query: "",
    results: [],
    isOpen: false,
    status: SearchStatus.Idle,
  });

  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const fetchResults = useCallback(async (query: string) => {
    if (!query || query.length < 2) {
      setSearchState((prev) => ({
        ...prev,
        results: [],
        status: SearchStatus.Idle,
      }));
      return;
    }

    setSearchState((prev) => ({ ...prev, status: SearchStatus.Loading }));

    try {
      const response = await axios.get<Post[]>(
        `${process.env.NEXT_PUBLIC_WORDPRESS_API}/posts`,
        {
          params: {
            search: query,
            per_page: 5,
          },
        }
      );

      setSearchState((prev) => ({
        ...prev,
        results: response.data,
        status: SearchStatus.Success,
        isOpen: true,
      }));
    } catch (error) {
      console.error("Search error:", error);

      let errorMessage: string = "An error occurred while searching";
      if (axios.isAxiosError(error)) {
        errorMessage += `: ${error.message}`;
        if (error.response) {
          console.error("Response data:", error.response.data);
        }
      }

      setSearchState((prev) => ({
        ...prev,
        status: SearchStatus.Error,
        results: [],
        errorMessage,
      }));
    }
  }, []);

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const query = event.target.value;
      setSearchState((prev) => ({ ...prev, query }));

      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }

      debounceTimeout.current = setTimeout(() => {
        fetchResults(query);
      }, 300);
    },
    [fetchResults]
  );

  useEffect(() => {
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, []);

  const navigateToPost = useCallback(
    (post: Post) => {
      const customUrl: string = `/blog/read/${post.slug}`;
      router.push(customUrl);
      close();
    },
    [router, close]
  );

  return {
    searchState,
    handleInputChange,
    navigateToPost,
    setSearchState,
  };
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "");
}

function HighlightQuery({
  text,
  query,
}: Readonly<{ text: string; query: string }>) {
  if (!query) return <>{text}</>;

  const escapedQuery: string = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const parts: string[] = text.split(new RegExp(`(${escapedQuery})`, "gi"));

  return (
    <>
      {parts.map((part, index) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark
            key={`highlight-${index}`}
            className="bg-transparent text-blue-500 underline"
          >
            {part}
          </mark>
        ) : (
          <span key={`text-${index}`}>{part}</span>
        )
      )}
    </>
  );
}

function SearchResult({
  post,
  resultIndex,
  query,
  onSelect,
}: Readonly<{
  post: Post;
  resultIndex: number;
  query: string;
  onSelect: (post: Post) => void;
}>) {
  const title: string = post?.title?.rendered || "";
  const excerpt: string = post?.excerpt?.rendered || "";
  const excerptLength: string = excerpt.length > 100 ? "..." : "";
  const cleanTitle: string =
    typeof title === "string" ? stripHtml(convertEncode(title)) : "";
  const cleanExcerpt: string =
    typeof excerpt === "string"
      ? stripHtml(convertEncode(excerpt)).substring(0, 100) + excerptLength
      : "";

  return (
    <li
      className={clss(
        "group block cursor-pointer px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-900/50",
        resultIndex > 0 ? "border-t border-gray-100 dark:border-gray-800" : ""
      )}
    >
      <Button
        variant="default"
        onClick={() => onSelect(post)}
        className="items-start flex-col text-start"
      >
        <div className="text-sm font-medium text-gray-900 group-hover:text-blue-500 dark:text-gray-100">
          <HighlightQuery text={cleanTitle} query={query} />
        </div>
        {post.date && (
          <Time className="mt-1 text-xs text-gray-500" date={post.date}>
            {formatDate(post.date)}
          </Time>
        )}
        <div className="mt-1 text-xs text-gray-600 dark:text-gray-400">
          <HighlightQuery text={cleanExcerpt} query={query} />
        </div>
      </Button>
    </li>
  );
}

function SearchResults({
  searchState,
  onSelect,
}: Readonly<{
  searchState: WordPressSearchState;
  onSelect: (post: Post) => void;
}>) {
  const { query, results, status } = searchState;

  if (status === SearchStatus.Loading) {
    return (
      <div className="p-6 text-center">
        <Svg
          variant="outline"
          width={20}
          height={20}
          draw={["M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"]}
          className="mx-auto animate-spin text-gray-700 dark:text-gray-300"
        />
        <p className="mt-2 text-xs text-gray-700 dark:text-gray-400">
          Searching...
        </p>
      </div>
    );
  }

  if (status === SearchStatus.Error) {
    return (
      <div className="p-6 text-center">
        <p className="text-xs text-red-600 dark:text-red-400">
          An error occurred while searching. Please try again.
        </p>
      </div>
    );
  }

  if (query && results.length === 0) {
    return (
      <div className="p-6 text-center">
        <Svg
          variant="outline"
          width={24}
          height={24}
          draw={[
            "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607ZM13.5 10.5h-6",
          ]}
          className="mx-auto text-gray-400 dark:text-gray-600"
        />
        <p className="mt-3 text-xs text-gray-700 dark:text-gray-400">
          Nothing found for{" "}
          <strong className="break-words font-semibold text-gray-800 dark:text-gray-200">
            &quot;{query}&quot;
          </strong>
          . Please try again.
        </p>
      </div>
    );
  }

  if (!Array.isArray(results)) {
    return null;
  }

  return (
    <ul className="w-full h-full max-h-100 overflow-y-auto">
      {results.map((post, index) => (
        <SearchResult
          key={post.id || index}
          post={post}
          resultIndex={index}
          query={query}
          onSelect={onSelect}
        />
      ))}
    </ul>
  );
}

const SearchInput = forwardRef<
  HTMLInputElement,
  {
    searchState: WordPressSearchState;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onClose: () => void;
  }
>(function SearchInput({ searchState, onChange, onClose }, inputRef) {
  return (
    <div className="group relative flex h-12">
      <Svg
        variant="outline"
        width={16}
        height={16}
        draw={[
          "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z",
        ]}
        className="absolute left-3 top-0 h-full text-gray-700 dark:text-gray-300 mr-1.5"
      />
      <label htmlFor="search-blog" className="sr-only">
        Search blog
      </label>
      <input
        ref={inputRef}
        id="search-blog"
        name="search-blog"
        type="search"
        data-autofocus
        className={clss(
          "flex-auto text-sm/6 appearance-none bg-transparent pl-10 text-gray-700 dark:text-gray-300 outline-none placeholder:text-gray-500 focus:w-full focus:flex-none",
          searchState.status === SearchStatus.Loading ? "pr-11" : "pr-4"
        )}
        placeholder="Search blog posts..."
        value={searchState.query}
        spellCheck={false}
        autoComplete="off"
        onChange={onChange}
        onKeyDown={(event) => {
          if (
            event.key === "Escape" &&
            !searchState.isOpen &&
            searchState.query === ""
          ) {
            if (document.activeElement instanceof HTMLElement) {
              document.activeElement.blur();
            }
            onClose();
          }
        }}
      />
      {searchState.status === SearchStatus.Loading && (
        <div className="absolute inset-y-0 right-3 flex items-center">
          <Svg
            variant="outline"
            width={20}
            height={20}
            draw={[
              "M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99",
            ]}
            className="animate-spin text-gray-200"
          />
        </div>
      )}
    </div>
  );
});

function SearchDialog({
  open,
  setOpen,
  className,
}: Readonly<{
  open: boolean;
  setOpen: (open: boolean) => void;
  className?: string;
}>) {
  const formRef = useRef<HTMLFormElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { searchState, handleInputChange, navigateToPost, setSearchState } =
    useWordPressSearch({
      close() {
        setOpen(false);
      },
    });
  const pathname = usePathname();

  useEffect(() => {
    if (pathname) {
      setOpen(false);
    }
  }, [pathname, setOpen]);

  useEffect(() => {
    if (open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen(true);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, setOpen]);

  useEffect(() => {
    if (open) {
      document.documentElement.classList.add("overflow-hidden");
    }

    return () => {
      document.documentElement.classList.remove("overflow-hidden");
    };
  }, [open]);

  const handleClose = () => {
    setOpen(false);
    setSearchState((prev) => ({
      ...prev,
      query: "",
      results: [],
      status: SearchStatus.Idle,
    }));
  };

  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    setHasError(false);
  }, [open]);

  if (hasError) {
    return (
      <div
        className={clss(
          open ? "block" : "hidden",
          "fixed inset-0 z-50",
          className
        )}
      >
        <button
          className="fixed inset-0 z-40 size-full backdrop-blur-sm bg-gray-400/25 dark:bg-gray-950/40"
          onClick={handleClose}
          aria-label="Close search dialog"
        />

        <div className="fixed inset-0 z-50 overflow-y-auto px-4 py-4 sm:px-6 sm:py-20 md:py-32 lg:px-8 lg:py-[15vh]">
          <div className="mx-auto transform-gpu overflow-hidden rounded-lg bg-gray-50 shadow-xl ring-1 ring-gray-900/7.5 sm:max-w-xl dark:bg-gray-900 dark:ring-gray-800 p-6 text-center">
            <p className="text-red-600 dark:text-red-400">
              Something went wrong. Please try again.
            </p>
            <Button
              variant="default"
              className="mt-4"
              onClick={() => {
                setHasError(false);
                handleClose();
              }}
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={clss(
        open ? "block" : "hidden",
        "fixed inset-0 z-50",
        className
      )}
    >
      <button
        className="fixed inset-0 z-40 size-full backdrop-blur-sm bg-gray-400/25 dark:bg-gray-950/40"
        onClick={handleClose}
        aria-label="Close search dialog"
      />

      <div className="fixed inset-y-0 inset-x-1/2 -translate-x-1/2 z-50 w-[calc(100%-20%)] h-max overflow-y-auto px-4 py-4 sm:px-6 sm:py-20 md:py-32 lg:w-[calc(100%-50%)] lg:px-8 lg:py-[15vh]">
        <div className="mx-auto w-full transform-gpu overflow-hidden rounded-lg bg-gray-50 shadow-xl ring-1 ring-gray-900/7.5 dark:bg-gray-900 dark:ring-gray-800">
          <form ref={formRef} onSubmit={(event) => event.preventDefault()}>
            <SearchInput
              ref={inputRef}
              searchState={searchState}
              onChange={handleInputChange}
              onClose={handleClose}
            />
            <div
              ref={panelRef}
              className="border-t border-gray-200 bg-gray-50 empty:hidden dark:border-gray-100/5 dark:bg-gray-50/2.5"
            >
              {searchState.query && (
                <SearchResults
                  searchState={searchState}
                  onSelect={navigateToPost}
                />
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function useSearchProps() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState<boolean>(false);

  return {
    buttonProps: {
      ref: buttonRef,
      onClick() {
        setOpen(true);
      },
    },
    dialogProps: {
      open,
      setOpen: useCallback(
        (open: boolean) => {
          const { width = 0, height = 0 } =
            buttonRef.current?.getBoundingClientRect() ?? {};
          if (!open || (width !== 0 && height !== 0)) {
            setOpen(open);
          }
        },
        [setOpen]
      ),
    },
  };
}

export function Search() {
  const [modifierKey, setModifierKey] = useState<string>("");
  const { buttonProps, dialogProps } = useSearchProps();

  useEffect(() => {
    setModifierKey(
      /(Mac|iPhone|iPod|iPad)/i.test(navigator.userAgent) ? "⌘" : "Ctrl "
    );
  }, []);

  return (
    <div className="block max-w-md flex-auto">
      <Button
        variant="default"
        className="flex font-normal h-8 w-full items-center gap-2 rounded-md bg-gray-50 pl-2 pr-3 text-sm text-zinc-500 ring-1 ring-zinc-900/10 hover:ring-zinc-900/20 ui-not-focus-visible:outline-none dark:bg-gray-50/5 dark:text-zinc-400 dark:ring-inset dark:ring-gray-50/10 dark:hover:ring-gray-50/20 lg:rounded-full"
        {...buttonProps}
      >
        <Svg
          variant="outline"
          width={16}
          height={16}
          draw={[
            "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z",
          ]}
        />
        Find post...
        <kbd className="font-mono ml-auto text-xs text-zinc-400 dark:text-zinc-500">
          <kbd>{modifierKey}</kbd>
          <kbd>K</kbd>
        </kbd>
      </Button>
      <Suspense fallback={null}>
        <SearchDialog {...dialogProps} />
      </Suspense>
    </div>
  );
}
