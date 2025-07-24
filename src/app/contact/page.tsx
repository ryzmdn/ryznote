import type { Metadata } from "next";
import { Button } from "@/components/common/Button";

export const metadata: Metadata = {
  title: "Contact",
};

export default function Contact() {
  return (
    <div className="w-full bg-transparent">
      <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div
            className="relative z-10 px-3 py-1.5 text-gray-600 dark:text-gray-400 font-medium"
          >
            Contact me
          </div>
          <h2 className="text-4xl font-semibold tracking-tight text-balance text-gray-950 dark:text-gray-50 sm:text-5xl">
            Do you have questions
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg/8 text-pretty text-gray-600 dark:text-gray-400">
            Want to chat? Just shoot me a dm <Button variant="link" href="https://www.linkedin.com/in/ryzmdn">with a direct question on LinkedIn</Button> and I&apos;ll respond whenever I can. I will ignore all soliciting.
          </p>
        </div>
      </div>
    </div>
  )
}
