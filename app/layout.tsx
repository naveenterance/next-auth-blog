import { ReactNode } from "react";
import "./globals.css";

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
          <div className="mt-8">{children}</div>
        </div>
      </body>
    </html>
  );
}
