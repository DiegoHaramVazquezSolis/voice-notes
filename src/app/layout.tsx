import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";

import "./globals.css";

import { PermissionProvider } from "@/context/PermissionContext";
import { NotesProvider } from "@/context/NotesContext";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Voice notes web app",
  description: "Avena Challenge 2024",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <PermissionProvider>
            <NotesProvider>
              {children}
            </NotesProvider>
          </PermissionProvider>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
