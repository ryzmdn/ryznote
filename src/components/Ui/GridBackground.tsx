import { clss } from "@/utils/clss";
import { ReactNode } from "react";

export function GridBackground({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div className="relative flex flex-col w-full items-center justify-center py-28 bg-gray-50 dark:bg-gray-950">
      <div
        className={clss(
          "absolute inset-0",
          "[background-size:40px_40px] opacity-5 dark:opacity-45",
          "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
          "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
        )}
      />

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-gray-50 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-gray-950" />
      <div className="relative z-5">
        {children}
      </div>
    </div>
  );
}
