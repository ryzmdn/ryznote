import { Button } from "@/components/common/Button";
import { Svg } from "@/components/common/Svg";

const BROWSE_MORE_BUTTON = (
  <Button
    variant="ghost"
    href="/blog/category/all?page=1"
    className="text-base px-3 py-1.5"
  >
    Browse more posts
    <Svg
      variant="outline"
      width={16}
      height={16}
      draw={["m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"]}
    />
  </Button>
);

export function SectionHeader({
  title,
  action = BROWSE_MORE_BUTTON,
}: Readonly<{
  title: string;
  action?: React.ReactNode;
}>) {
  return (
    <header
      id={`${title.replace(/ /gi, "-").toLowerCase()}-header`}
      className="sm:flex sm:items-center sm:justify-between mb-8"
    >
      <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200">
        {title}
      </h2>
      <div className="mt-3 sm:mt-0 sm:ml-4">{action}</div>
    </header>
  );
}
