"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "@/providers/convex-client-provider";
import { Authenticated, AuthLoading } from "convex/react";
import { Loading } from "@/components/auth/loding";
import { Toaster } from "@/components/ui/sonner";
import { ModalProvider } from "@/providers/modal-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <ConvexClientProvider>
            <Authenticated>
              <Toaster />
              <ModalProvider />
               {children}
            </Authenticated>
            <AuthLoading>
              <Loading />
            </AuthLoading>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
