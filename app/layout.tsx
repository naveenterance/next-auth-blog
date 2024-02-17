import { ReactNode } from "react";
import "./globals.css";
import AuthProvider from "@/utils/AuthProvider";

export const metadata = {
  title: "blog",
  description: "blog",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      {/* <body className="w-screen h-screen bg-[url('../public/wave.svg')] bg-fixed bg-no-repeat bg-cover bg-center"> */}
      <body className="bg-gradient-to-r from-gray-100 to-gray-300 overflow-x-hidden">
        <div>
          <AuthProvider>{children}</AuthProvider>
        </div>
      </body>
    </html>
  );
}
