export {};

declare global {
  interface Window {
    google: {
      translate: {
        TranslateElement: GoogleTranslateElementConstructor;
      };
    };
    googleTranslateElementInit: () => void;
  }
}

interface GoogleTranslateElementConstructor {
  new (
    options: {
      pageLanguage: string;
      includedLanguages?: string;
      layout?: unknown;
      autoDisplay?: boolean;
    },
    id: string
  ): void;
  InlineLayout: {
    SIMPLE: number;
    HORIZONTAL: number;
    VERTICAL: number;
  };
}
