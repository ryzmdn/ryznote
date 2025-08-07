import { ReactNode } from "react";
import axios from "axios";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ThemeProvider } from "@/context/ThemeProvider";
import { Category } from "@/types/wordpress";

async function getPosts() {
  try {
    const response = await axios.get<Category[]>(`${process.env.NEXT_PUBLIC_WORDPRESS_API}/categories`);
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export async function Provider({ children }: Readonly<{ children: ReactNode }>) {
  const categories = await getPosts();
  
  return (
    <ThemeProvider>
      <Header />
      <main className="mx-auto max-w-6xl w-full px-6 lg:px-8">
        {children}
      </main>
      <Footer categories={categories} />
    </ThemeProvider>
  );
}
