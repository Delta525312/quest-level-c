import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import "./globals.css";

const prompt = Prompt({
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-prompt",
});

export const metadata: Metadata = {
  title: "Quest LV.C",
  description: "ของขวัญพิกเซลน่ารักสำหรับคนพิเศษ",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="th" className="scroll-smooth">
      <body className={`${prompt.variable} font-body`}>
        {children}
      </body>
    </html>
  );
}
