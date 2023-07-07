import "./globals.css";
import { Inter } from "next/font/google";
import Provider from "./context/AuthContext";
import ToasterContext from "./context/ToasterContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Seanema",
  description: "A Brand New Movie Booking App!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`bg-primaryBg text-white ${inter.className}`}>
        <Provider>
          <ToasterContext />
          {children}
        </Provider>
      </body>
    </html>
  );
}
