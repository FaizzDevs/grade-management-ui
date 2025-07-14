import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"]
});

export const metadata = {
  title: "Grade Management UI",
  description: "Dahsboard Input Nilai OBE",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={poppins.variable}>
      <body
        className="font-poppins bg-gray-50 text-gray-900"
      >
        {children}
      </body>
    </html>
  );
}
