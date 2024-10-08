import type { Metadata } from "next";
import {Roboto} from "next/font/google";
import "./globals.css";
import AuthProvider from "@/context/AuthProvider";
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider";
import { LinksProvider } from "@/context/LinkProvider";

const roboto = Roboto({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
  weight: "400"
})

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <AuthProvider>

      <body
        className={`${roboto.variable} antialiased font-sans`}
        >
         <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <LinksProvider>
            {children}
            </LinksProvider>
          </ThemeProvider>
        <Toaster />
      </body>
        </AuthProvider>
    </html>
  );
}
