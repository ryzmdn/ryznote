import { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ThemeProvider } from "@/context/ThemeProvider";

export async function Provider({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <ThemeProvider>
      <Header />
      <main className="mx-auto max-w-6xl w-full px-6 lg:px-8">
        {children}
      </main>
      <Footer />
    </ThemeProvider>
  );
}
