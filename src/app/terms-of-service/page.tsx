import { Button } from "@/components/Ui/Button";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
};

export default function TermsOfService() {
  return (
    <>
      <header id="header-terms-of-service" className="bg-transparent px-6 py-16 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-semibold tracking-tight capitalize text-gray-900 dark:text-gray-100 sm:text-5xl">
            Terms of Service
          </h2>
          <p className="flex justify-center items-center gap-x-4 mt-4 text-gray-600 dark:text-gray-400">
            Last Updated: March 27, 2025
          </p>
        </div>
      </header>

      <div className="flex flex-col gap-y-6 w-full max-w-5xl mx-auto [&_ul]:space-y-1.5 text-gray-700 dark:text-gray-300">
        <section id="introduction">
          <h3 className="text-lg/7 text-gray-900 dark:text-gray-100 font-medium mb-2">1. Introduction</h3>
          <p>
            Welcome to RyzNote, a personal blog platform. By accessing or using
            our website, you agree to these Terms of Service
            (&quot;Terms&quot;). Please read them carefully.
          </p>
        </section>

        <section id="acceptance">
          <h3 className="text-lg/7 text-gray-900 dark:text-gray-100 font-medium mb-2">2. Acceptance of Terms</h3>
          <p>
            By subscribing, accessing, or using RyzNote, you agree to be bound
            by these Terms. If you do not agree with any part of these Terms,
            you may not use our services.
          </p>
        </section>

        <section id="user-account">
          <h3 className="text-lg/7 text-gray-900 dark:text-gray-100 font-medium mb-2">3. User Account and Subscription</h3>
          <h4 className="text-base/7 text-gray-800 dark:text-gray-200 font-medium my-2">3.1 Email Subscription</h4>
          <ul className="list-disc pl-4 text-gray-700 dark:text-gray-300">
            <li>Users can subscribe to RyzNote using their email address.</li>
            <li>
              By subscribing, you consent to receive periodic updates and
              communications from RyzNote.
            </li>
            <li>
              You may unsubscribe at any time using the unsubscribe link
              provided in our emails.
            </li>
          </ul>

          <h4 className="text-base/7 text-gray-800 dark:text-gray-200 font-medium my-2">3.2 Local Storage Collection</h4>
          <ul className="list-disc pl-4 text-gray-700 dark:text-gray-300">
            <li>
              RyzNote uses browser local storage to allow users to collect and
              save items.
            </li>
            <li>
              Local storage data is stored entirely on your device and is not
              transmitted to our servers.
            </li>
            <li>
              You are responsible for managing and protecting your local storage
              data.
            </li>
          </ul>
        </section>

        <section id="privacy">
          <h3 className="text-lg/7 text-gray-900 dark:text-gray-100 font-medium mb-2">4. Privacy and Data Handling</h3>
          <ul className="list-disc pl-4 text-gray-700 dark:text-gray-300">
            <li>
              Your email address is collected solely for subscription purposes.
            </li>
            <li>
              We do not sell, trade, or share your email with third parties.
            </li>
            <li>
              Local storage data remains private and accessible only on your
              device.
            </li>
          </ul>
        </section>

        <section id="intellectual-property">
          <h3 className="text-lg/7 text-gray-900 dark:text-gray-100 font-medium mb-2">5. Intellectual Property</h3>
          <p>
            All content on RyzNote, unless otherwise specified, is the property
            of the blog owner. Reproduction, distribution, or use of content
            without explicit permission is prohibited.
          </p>
        </section>

        <section id="limitations">
          <h3 className="text-lg/7 text-gray-900 dark:text-gray-100 font-medium mb-2">6. Limitations of Liability</h3>
          <ul className="list-disc pl-4 text-gray-700 dark:text-gray-300">
            <li>
              RyzNote is provided &quot;as is&quot; without any warranties.
            </li>
            <li>
              We are not liable for any direct, indirect, incidental, or
              consequential damages.
            </li>
            <li>
              Local storage data is not backed up; users are responsible for
              their own data preservation.
            </li>
          </ul>
        </section>

        <section id="contact">
          <h3 className="text-lg/7 text-gray-900 dark:text-gray-100 font-medium mb-2">7. Contact Information</h3>
          <p>
            For any questions, concerns, or issues, please contact the developer
            at: <Button variant="link" href="mailto:riybuzniz@gmail.com">riybuzniz@gmail.com</Button>
          </p>
        </section>

        <section id="modifications">
          <h3 className="text-lg/7 text-gray-900 dark:text-gray-100 font-medium mb-2">8. Modifications to Terms</h3>
          <p>
            RyzNote reserves the right to modify these Terms at any time.
            Continued use of the platform after changes constitutes acceptance
            of the new Terms.
          </p>
        </section>
      </div>
    </>
  );
}
