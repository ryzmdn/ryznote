import type { Metadata } from "next";
import { Button } from "@/components/common/Button";

export const metadata: Metadata = {
  title: "Frequently Asked Question",
};

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What is RyzNote?",
    answer: "RyzNote is a personal blog containing notes, tutorials, and opinions about web development, technology, and other interesting topics."
  },
  {
    question: "What technologies are used in the making of RyzNote?",
    answer: "RyzNote is built using WordPress as the CMS, and article data is fetched via the WordPress REST API. The frontend is built with Next.js, Tailwind CSS and TypeScript."
  },
  {
    question: "How to search for articles in RyzNote?",
    answer: "You can use the search feature available at the top of the page. Just enter the keyword you want to search for."
  },
  {
    question: "Can I leave a comment on RyzNote articles?",
    answer: "This feature is under development. You cannot comment on existing articles yet.",
  },
  {
    question: "How to subscribe to the latest articles from RyzNote?",
    answer: "This feature is under development. You will be able to subscribe via email by entering your email address in the subscription form available above the footer."
  },
  {
    question: "Does RyzNote have specific article categories?",
    answer: "Yes, RyzNote has several categories such as Web Development, Technology, Tutorials, and Opinions. You can see the list of categories in the navigation menu or the main part of the page and the web footer section which contains 5 popular categories."
  },
  {
    question: "How to contact RyzNote authors?",
    answer: "You can contact the author via the Contact page available in the navigation menu or via social media listed in the footer and you can also see it on the about page."
  },
  {
    question: "Does RyzNote have a mobile version?",
    answer: "Of course, RyzNote is designed to be responsive and accessible on a variety of devices, including smartphones and tablets."
  },
  {
    question: "Is the content on RyzNote shareable?",
    answer: "Of course, you are allowed to share the content on RyzNote by citing the original source if you share the content."
  },
];

export default function Faqs() {
  return (
    <div className="w-full py-20">
      <h2 className="text-4xl font-semibold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
        Frequently asked questions
      </h2>
      <p className="mt-6 max-w-2xl text-base/7 text-gray-600 dark:text-gray-400">
        Have a different question and can’t find the answer you’re looking for?
        Reach out to our support team by{" "}
        <Button
          variant="link"
          href="mailto:riybuzniz@gmail.com"
        >
          sending us an email
        </Button>{" "}
        and we’ll get back to you as soon as we can.
      </p>
      <dl className="mt-20 divide-y divide-gray-900/10 dark:divide-gray-50/10">
        {faqs.map((faq) => (
          <div
            key={faq.question}
            id={faq.question.replace(/ /g, "-").toLowerCase()}
            className="py-8 first:pt-0 last:pb-0 lg:grid lg:grid-cols-12 lg:gap-8"
          >
            <dt className="text-base/7 font-semibold text-gray-800 dark:text-gray-200 lg:col-span-5">
              {faq.question}
            </dt>
            <dd className="mt-4 lg:col-span-7 lg:mt-0">
              <p className="text-base/7 text-gray-700 dark:text-gray-300">{faq.answer}</p>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
