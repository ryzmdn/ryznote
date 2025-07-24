import { Button } from "@/components/common/Button";

export default function NotFound() {
  return (
    <div className="min-h-full bg-transparent px-6 py-24 sm:py-32 lg:px-8">
      <div className="flex flex-col justify-center items-center text-center gap-y-3">
        <h2 className="text-8xl font-bold text-indigo-500 lg:text-9xl">404</h2>
        <p className="text-xl font-semibold tracking-tight text-balance text-gray-900 dark:text-gray-100 lg:text-2xl">
          Page not found
        </p>
        <p className="text-base/6 font-normal text-pretty text-gray-600 dark:text-gray-400 sm:text-xl/8">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <Button href="/" className="mt-3 px-3 py-2">
          Go back home
        </Button>
      </div>
    </div>
  );
}
