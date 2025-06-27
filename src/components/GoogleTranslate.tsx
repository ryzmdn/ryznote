"use client";

import { useEffect, useState } from "react";

export function GoogleTranslate() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const addGoogleTranslateScript = () => {
      const script = document.createElement("script");
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      document.body.appendChild(script);

      (window as any).googleTranslateElementInit = () => {
        new (window as any).google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,id,ja,fr,de,es,zh-CN",
            layout: (window as any).google.translate.TranslateElement
              .InlineLayout.SIMPLE,
            autoDisplay: false,
          },
          "google_translate_element"
        );
      };
    };

    addGoogleTranslateScript();
  }, []);

  if (!isMounted) return null;

  return (
    <div className="flex flex-col">
      <div id="google_translate_element" suppressHydrationWarning className="google-translate" />
      <p className="text-sm/6 text-gray-600 dark:text-gray-400">
        Click logo for translate
      </p>
    </div>
  );
}
