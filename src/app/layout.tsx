import "./globals.css";
import { Dancing_Script } from "next/font/google";
import { Suspense } from "react";

const dancing = Dancing_Script({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata = {
  title: "Teseter@57",
  description: "A little place of love and memories",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${dancing.className} bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100`}>
        <Suspense fallback={<div>Loading...</div>}>
          {children}
        </Suspense>
      </body>
    </html>
  );
}
