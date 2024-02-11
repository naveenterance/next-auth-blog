import "./globals.css";

export const metadata = {
  title: "blog",
  description: "blog",
};

export default function RootLayout({ children }) {
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
