import type { Metadata } from "next";
import { Button } from "@/components/Ui/Button";

export const metadata: Metadata = {
  title: "Contact",
};

export default function Contact() {
  return (
    <div className="text-center mx-auto w-max rounded-2xl bg-gray-100 dark:bg-gray-900 p-10">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 sm:text-2xl">
        Contact on Email
      </h3>
      <Button
        variant="link"
        href="mailto:riybuzniz@gmail.com"
        className="font-medium text-indigo-600 mt-3 text-sm/6"
      >
        riybuzniz@gmail.com
      </Button>
    </div>
  );
}
