import type { Metadata } from "next";
import "../globals.css";
import React from "react";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "DishDiscover - Auth",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <div>{children}</div>
        </body>
      </html>
    </ClerkProvider>
  );
}
