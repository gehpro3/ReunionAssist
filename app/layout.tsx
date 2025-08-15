// app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import './globals.css';
//import Sidebar from "@/app/components/Sidebar";
import Sidebar from "@/components/Sidebar"; // <-- Comment this line out
// import Sidebar from './components/Sidebar'; // <-- Add this new line

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Reunion Assist Dashboard",
  description: "Manage your reunion event with ease.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen bg-gray-900 text-white">
          {/* Sidebar Navigation */}
          <Sidebar />

          {/* Main Content Area */}
          <main className="flex-1 p-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
