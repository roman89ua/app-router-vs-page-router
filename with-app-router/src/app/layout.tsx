import type { Metadata } from "next";
import { MainNavbar } from "@/components/MainNavbar";
import "./globals.css";
import Anchor from "@/components/Anchor";
import { exo2, orbitron } from "@/app/fonts";
import BiggestHeading from "@/components/BiggestHeading";

export const metadata: Metadata = {
  title: {
    default: "RomanGamer",
    template: "RomanGamer | %s",
  },
  description: "Games reviews that Roman Kostiuk had played",
  keywords: ["next js", "Roman Kostiuk", "popular games", "games reviews"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={`${orbitron.variable} ${exo2.variable}`}>
      <body className='min-h-screen flex flex-col'>
        <header className='px-4 py-8 border-b-2 text-sky-50 bg-blue-900 bg-gradient-to-r from-sky-900 to-blue-500'>
          <MainNavbar />
        </header>
        <main className='grow px-4 py-8'>{children}</main>
        <footer className='px-4 py-8 text-center border-t-2 text-sky-50 bg-gradient-to-r from-blue-500 to-sky-900'>
          <BiggestHeading>FOOTER</BiggestHeading>
          Data was fetched from{" "}
          <Anchor href='https://rawg.io/' target='_blank'>
            RAWG
          </Anchor>
        </footer>
      </body>
    </html>
  );
}
