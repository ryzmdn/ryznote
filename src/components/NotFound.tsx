import { Svg } from "@/components/common/Svg";

export function NotFound({ variant = "not-found" }: Readonly<{ variant?: "not-found" | "error" }>) {
  return (
    <section
      id={variant === "not-found" ? `not-found-section` : `error-section`}
      className="relative block w-full rounded-lg border-2 border-dashed p-12 text-center border-gray-200 dark:border-gray-800"
    >
      <Svg
        variant="outline"
        width={64}
        height={64}
        className="mx-auto text-gray-900 dark:text-gray-100"
        draw={[
          variant === "not-found"
            ? "M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
            : "M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z",
        ]}
      />
      <h3 className="mt-2 text-lg/6 font-semibold text-gray-800 dark:text-gray-200 sm:text-xl">
        {variant === "not-found" ? "Post not found" : "Error get data"}
      </h3>
      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
        {variant === "not-found"
          ? "This may happen because all posts have been deleted or are under development."
          : "This may be due to your internet connection or failure to load the post."}
      </p>
    </section>
  );
}
