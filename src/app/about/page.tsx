import type { Metadata } from "next";
import Image from "next/image";
import picture from "@/assets/picture.webp";
import { socialIcons } from "@/components/Icons";
import { Pattern } from "@/components/Pattern";
import { Svg } from "@/components/Svg";
import { Button } from "@/components/Ui/Button";

export const metadata: Metadata = {
  title: "About",
};

export default function About() {
  return (
    <>
      <Pattern />
      <div className="max-w-5xl w-full mx-auto my-10 pt-6 pb-16">
        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
          <section className="flex flex-col gap-y-10 lg:pl-20">
            <div className="max-w-xs mx-auto px-2.5 lg:max-w-none lg:mx-0">
              <Image
                src={picture}
                alt="Me"
                priority
                width={324}
                height={324}
                className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
              />
            </div>

            <div>
              <ul className="flex flex-col gap-y-2 w-full">
                <li className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                  Rizky ramadhan
                </li>
                <li className="flex items-center gap-x-3 text-gray-700 dark:text-gray-400 w-full">
                  <Svg
                    width={20}
                    height={20}
                    draw={[
                      "M7.5 5.25a3 3 0 0 1 3-3h3a3 3 0 0 1 3 3v.205c.933.085 1.857.197 2.774.334 1.454.218 2.476 1.483 2.476 2.917v3.033c0 1.211-.734 2.352-1.936 2.752A24.726 24.726 0 0 1 12 15.75c-2.73 0-5.357-.442-7.814-1.259-1.202-.4-1.936-1.541-1.936-2.752V8.706c0-1.434 1.022-2.7 2.476-2.917A48.814 48.814 0 0 1 7.5 5.455V5.25Zm7.5 0v.09a49.488 49.488 0 0 0-6 0v-.09a1.5 1.5 0 0 1 1.5-1.5h3a1.5 1.5 0 0 1 1.5 1.5Zm-3 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z",
                      "M3 18.4v-2.796a4.3 4.3 0 0 0 .713.31A26.226 26.226 0 0 0 12 17.25c2.892 0 5.68-.468 8.287-1.335.252-.084.49-.189.713-.311V18.4c0 1.452-1.047 2.728-2.523 2.923-2.12.282-4.282.427-6.477.427a49.19 49.19 0 0 1-6.477-.427C4.047 21.128 3 19.852 3 18.4Z",
                    ]}
                  />
                  <p>Blogger & Web Developer</p>
                </li>
                <li className="mt-6">
                  <ul className="flex flex-wrap justify-center gap-x-3 gap-y-2 w-full lg:flex-col lg:justify-start">
                    {socialIcons.map((social) => (
                      <li key={social.name}>
                        <Button
                          variant="ghost"
                          href={social.href}
                          className="gap-x-3 px-2.5 py-1.5 font-normal"
                        >
                          <Svg width={20} height={20} draw={[social.path]} />
                          {social.name}
                        </Button>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </div>
          </section>
          <section className="lg:order-first lg:row-span-2">
            <h2 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
              I am Rizky Ramadhan. I am a Blogger and Web developer.
            </h2>
            <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
              <p>
                Hi everyone! I am Rizky Ramadhan, a blogger and programmer who
                is passionate about sharing knowledge and experiences through
                writing and coding. I believe that technology and words have the
                power to inspire and empower others.
              </p>
              <p>
                As a blogger, I enjoy exploring various topics relevant to the
                world of technology, programming, and self-development. I try to
                present information that is easy to understand, practical, and
                useful for readers.
              </p>
              <p>
                To accommodate my writings and projects, I created a website
                called &quot;<i>RyzNote</i>&quot;. Here, you can find various
                interesting articles, programming tutorials, and personal
                projects that I work on. &quot;<i>RyzNote</i>&quot; is my
                personal space in cyberspace, where I share my thoughts, ideas,
                and knowledge with anyone who is interested.
              </p>
              <p>
                I invite you to explore &quot;
                <Button
                  variant="link"
                  current
                  href="https://ryznote.vercel.app"
                >
                  RyzNote
                </Button>
                &quot; and find content that is useful to you. Feel free to
                leave comments, provide feedback, or contact me if you have
                questions or would like to collaborate. Let&apos;s learn and
                grow together!
              </p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
