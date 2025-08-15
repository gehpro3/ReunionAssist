import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Use the standard Inter font
import './globals.css';


const inter = Inter({ subsets: ["latin"] }); // Initialize Inter

export const metadata: Metadata = {
  title: "Reunion Assist Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Apply the Inter font class to the body */}
      <body className={inter.className}>{children}</body>
    </html>
  );
}
