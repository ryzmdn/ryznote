import { Metadata } from "next";

export const metadata: Metadata = {
  title: "License",
};

export default function License() {
  return (
    <>
      <header id="header-license" className="bg-transparent px-6 py-16 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-semibold tracking-tight capitalize text-gray-900 dark:text-gray-100 sm:text-5xl">
            License
          </h2>
          <p className="flex justify-center items-center gap-x-4 mt-4 text-gray-600 dark:text-gray-400">
            Last Updated: March 27, 2025
          </p>
        </div>
      </header>

      <div className="flex flex-col gap-y-6 w-full max-w-5xl mx-auto [&_ul]:space-y-1.5 text-gray-700 dark:text-gray-300">
        <section id="license-text" className="space-y-3">
          <p>
            Permission is hereby granted, free of charge, to any person
            obtaining a copy of this software and associated documentation files
            (the &quot;Software&quot;), to deal in the Software without restriction,
            including without limitation the rights to use, copy, modify, merge,
            publish, distribute, sublicense, and/or sell copies of the Software,
            and to permit persons to whom the Software is furnished to do so,
            subject to the following conditions:
          </p>

          <p>
            The above copyright notice and this permission notice shall be
            included in all copies or substantial portions of the Software.
          </p>

          <p>
            THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
            EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
            MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
            NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
            BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
            ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
            CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
            SOFTWARE.
          </p>
        </section>

        <section id="license-explanation">
          <h3 className="text-lg/7 text-gray-900 dark:text-gray-100 font-medium mb-2">What This License Means</h3>
          <h4 className="text-base/7 text-gray-800 dark:text-gray-200 font-medium my-2">For Users</h4>
          <ul className="list-disc pl-4 text-gray-700 dark:text-gray-300">
            <li>You can use the software freely</li>
            <li>You can modify the software</li>
            <li>You can distribute the software</li>
            <li>You can sublicense the software</li>
            <li>You can sell copies of the software</li>
          </ul>

          <h4 className="text-base/7 text-gray-800 dark:text-gray-200 font-medium my-2">Key Restrictions</h4>
          <ul className="list-disc pl-4 text-gray-700 dark:text-gray-300">
            <li>Must include the original copyright notice</li>
            <li>No warranty is provided</li>
            <li>Authors are not liable for any damages</li>
          </ul>
        </section>
      </div>
    </>
  );
}
