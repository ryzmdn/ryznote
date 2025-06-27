"use client";

import { useEffect, useState } from "react";

export default function GoogleTranslate() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "id",
          includedLanguages: "en,id,ja,fr,de,es,zh-CN",
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        "google_translate_element"
      );
    };

    const script = document.createElement("script");
    script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="flex flex-col">
      <div
        id="google_translate_element"
        suppressHydrationWarning
        className="google-translate"
      />
      <p className="text-sm/6 text-gray-600 dark:text-gray-400">
        Click logo for translate
      </p>
    </div>
  );
}
