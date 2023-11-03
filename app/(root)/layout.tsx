import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import "../globals.css";
import Topbar from "@/components/shared/Topbar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import Bottombar from "@/components/shared/Bottombar";

export const metadata: Metadata = {
  title: "DishDiscover - Share Recipes",
  description: "Post and share your recipes with other people",
  authors: [{ name: "Ryan Bakker", url: "https://ryanbakker.vercel.app" }],
  creator: "Ryan Bakker",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <Topbar />
          <main className="flex flex-row">
            <LeftSidebar />
            <section className="p-10">{children}</section>
          </main>
          <Bottombar />
        </body>
      </html>
    </ClerkProvider>
  );
}
