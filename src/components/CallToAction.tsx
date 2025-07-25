import picture from "@/assets/picture.webp";
import Image from "next/image";

export function CallToAction() {
  return (
    <section className="relative isolate overflow-hidden bg-gray-50 dark:bg-gray-950 py-26">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,var(--color-indigo-100),white)] dark:bg-[radial-gradient(45rem_50rem_at_top,var(--color-indigo-900),black)] opacity-20" />
      <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white dark:bg-black shadow-xl ring-1 shadow-indigo-600/10 ring-indigo-50 dark:ring-indigo-950 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
      <div className="mx-auto max-w-2xl lg:max-w-4xl">
        <figure className="w-full">
          <div className="relative size-24 mx-auto rounded-full overflow-hidden">
            <Image fill src={picture} alt="me" />
          </div>

          <div className="mt-6 flex items-center justify-center space-x-3 text-base">
            <h5 className="font-semibold text-gray-900 dark:text-gray-100">
              Rizky Ramadhan
            </h5>
            <svg
              width={3}
              height={3}
              viewBox="0 0 2 2"
              aria-hidden="true"
              className="fill-gray-800 dark:fill-gray-200"
            >
              <circle r={1} cx={1} cy={1} />
            </svg>
            <div className="text-gray-600 dark:text-gray-300">
              Content Writer
            </div>
          </div>
          <figcaption className="mt-10">
            <blockquote className="text-center text-lg/8 font-semibold text-gray-800 dark:text-gray-200 sm:text-xl/8">
              <p>
                &#8220;Hi everyone! I am Rizky Ramadhan, a blogger and
                programmer who is passionate about sharing knowledge and
                experiences through writing and coding. I believe that
                technology and words have the power to inspire and empower
                others.&#8221;
              </p>
            </blockquote>
          </figcaption>
        </figure>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-5 h-10 bg-gradient-to-b from-gray-50 dark:from-gray-950"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -bottom-5 h-10 bg-gradient-to-t from-gray-50 dark:from-gray-950"
      />
    </section>
  );
}
