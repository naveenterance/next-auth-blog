import { ReactNode } from "react";
import "./globals.css";
import AuthProvider from "./AuthProvider";

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
      <body>
        <div className="max-w-3xl mx-auto p-4">
          <div className="mt-8">
            <AuthProvider>{children}</AuthProvider>
          </div>
        </div>
      </body>
    </html>
  );
}
