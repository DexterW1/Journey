import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Journey",
  description:
    "Track and manage your personal journeys with ease. Monitor your progress, log your activities, and stay on top of your goals.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <NextUIProvider>
          <main className="flex min-h-screen flex-col items-center">
            {children}
          </main>
        </NextUIProvider>
      </body>
    </html>
  );
}
