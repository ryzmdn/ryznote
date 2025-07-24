import type { Metadata } from "next";
import { Button } from "@/components/common/Button";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPolicy() {
  return (
    <>
      <header id="header-terms-of-service" className="bg-transparent px-6 py-16 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-semibold tracking-tight capitalize text-gray-900 dark:text-gray-100 sm:text-5xl">
            Privacy Policy
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
            Welcome to RyzNote. This Privacy Policy outlines how we collect,
            use, protect, and handle your personal information and data when you
            interact with our personal blog.
          </p>
        </section>

        <section id="information-collection">
          <h3 className="text-lg/7 text-gray-900 dark:text-gray-100 font-medium mb-2">2. Information We Collect</h3>
          <h4 className="text-base/7 text-gray-800 dark:text-gray-200 font-medium my-2">2.1 Email Subscription Data</h4>
          <ul className="list-disc pl-4 text-gray-700 dark:text-gray-300">
            <li>Email address provided during subscription</li>
            <li>Voluntary information shared when contacting the developer</li>
          </ul>

          <h4 className="text-base/7 text-gray-800 dark:text-gray-200 font-medium my-2">2.2 Local Storage Data</h4>
          <ul className="list-disc pl-4 text-gray-700 dark:text-gray-300">
            <li>
              Items collected and stored in your browser&apos;s local storage
            </li>
            <li>Entirely client-side data, not transmitted to our servers</li>
          </ul>

          <h4 className="text-base/7 text-gray-800 dark:text-gray-200 font-medium my-2">2.3 Automatically Collected Information</h4>
          <ul className="list-disc pl-4 text-gray-700 dark:text-gray-300">
            <li>Basic browser information</li>
            <li>IP address</li>
            <li>Access timestamps</li>
          </ul>
        </section>

        <section id="data-usage">
          <h3 className="text-lg/7 text-gray-900 dark:text-gray-100 font-medium mb-2">3. How We Use Your Information</h3>
          <h4 className="text-base/7 text-gray-800 dark:text-gray-200 font-medium my-2">3.1 Email Subscription</h4>
          <ul className="list-disc pl-4 text-gray-700 dark:text-gray-300">
            <li>Send blog updates and newsletters</li>
            <li>Respond to your inquiries</li>
            <li>Provide personalized communication</li>
          </ul>

          <h4 className="text-base/7 text-gray-800 dark:text-gray-200 font-medium my-2">3.2 Local Storage Usage</h4>
          <ul className="list-disc pl-4 text-gray-700 dark:text-gray-300">
            <li>Store user-collected items locally</li>
            <li>Enhance user experience through persistent storage</li>
            <li>No server-side tracking or storage of these items</li>
          </ul>
        </section>

        <section id="data-protection">
          <h3 className="text-lg/7 text-gray-900 dark:text-gray-100 font-medium mb-2">4. Data Protection and Security</h3>
          <ul className="list-disc pl-4 text-gray-700 dark:text-gray-300">
            <li>Email addresses are stored securely</li>
            <li>Local storage data remains entirely on user&apos;s device</li>
            <li>No third-party sharing of personal information</li>
            <li>
              Use of standard security practices to protect collected data
            </li>
          </ul>
        </section>

        <section id="user-rights">
          <h3 className="text-lg/7 text-gray-900 dark:text-gray-100 font-medium mb-2">5. Your Rights and Choices</h3>
          <h4 className="text-base/7 text-gray-800 dark:text-gray-200 font-medium my-2">5.1 Email Subscription</h4>
          <ul className="list-disc pl-4 text-gray-700 dark:text-gray-300">
            <li>Unsubscribe at any time via link in newsletters</li>
            <li>Request removal of email from mailing list</li>
          </ul>

          <h4 className="text-base/7 text-gray-800 dark:text-gray-200 font-medium my-2">5.2 Local Storage</h4>
          <ul className="list-disc pl-4 text-gray-700 dark:text-gray-300">
            <li>Full control over stored items</li>
            <li>
              Can clear local storage at any time through browser settings
            </li>
          </ul>
        </section>

        <section id="cookies-tracking">
          <h3 className="text-lg/7 text-gray-900 dark:text-gray-100 font-medium mb-2">6. Cookies and Tracking</h3>
          <ul className="list-disc pl-4 text-gray-700 dark:text-gray-300">
            <li>Minimal use of cookies for essential website functionality</li>
            <li>No invasive tracking mechanisms</li>
            <li>Local storage used for user preferences and collections</li>
          </ul>
        </section>

        <section id="third-party-services">
          <h3 className="text-lg/7 text-gray-900 dark:text-gray-100 font-medium mb-2">7. Third-Party Services</h3>
          <ul className="list-disc pl-4 text-gray-700 dark:text-gray-300">
            <li>No active integration with third-party analytics</li>
            <li>
              Potential use of essential web services with strict privacy
              controls
            </li>
          </ul>
        </section>

        <section id="compliance">
          <h3 className="text-lg/7 text-gray-900 dark:text-gray-100 font-medium mb-2">8. Legal Compliance</h3>
          <ul className="list-disc pl-4 text-gray-700 dark:text-gray-300">
            <li>Adherence to relevant data protection regulations</li>
            <li>Commitment to user privacy and data minimization</li>
          </ul>
        </section>

        <section id="contact-information">
          <h3 className="text-lg/7 text-gray-900 dark:text-gray-100 font-medium mb-2">9. Contact Us</h3>
          <p>
            For privacy-related questions or concerns, please contact:{" "}
            <Button variant="link" href="mailto:riybuzniz@gmail.com">riybuzniz@gmail.com</Button>
          </p>
        </section>

        <section id="policy-updates">
          <h3 className="text-lg/7 text-gray-900 dark:text-gray-100 font-medium mb-2">10. Policy Updates</h3>
          <p>
            We may update this Privacy Policy periodically. Users are encouraged
            to review it regularly. Continued use of RyzNote after changes
            constitutes acceptance of the updated policy.
          </p>
        </section>
      </div>
    </>
  );
}
