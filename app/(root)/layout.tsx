import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import "../globals.css";
import Topbar from "@/components/shared/Topbar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import Bottombar from "@/components/shared/Bottombar";
import { Lora, Inter } from "next/font/google";

export const metadata: Metadata = {
  title: "DishDiscover - Share Recipes",
  description: "Post and share your recipes with other people",
  authors: [{ name: "Ryan Bakker", url: "https://ryanbakker.vercel.app" }],
  creator: "Ryan Bakker",
};

// Global Fonts
const inter = Inter({
  subsets: ["latin"],
  display: "fallback",
});

const lora = Lora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lora",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${lora.variable}`}>
        <body className="flex flex-col min-h-screen">
          <Topbar />
          <main className="flex flex-row flex-1 h-full">
            <LeftSidebar />
            <section className=" flex-1 p-8 w-full h-full flex flex-col items-center mx-auto">
              <div className="min-w-[300px] md:min-w-[600px] lg:min-w-[800px] flex flex-col">
                {children}
              </div>
            </section>
          </main>
          <Bottombar />
        </body>
      </html>
    </ClerkProvider>
  );
}
