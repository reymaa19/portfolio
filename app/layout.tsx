import type { Metadata } from "next";
//import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
    title: "Reynald Maala",
    description: "Hi, I'm Reynald 👋",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={"font-Satoshi antialiased mx-auto flex flex-col min-h-screen max-w-3xl lg:max-w-5xl px-8"}>
                <main className="flex-grow">{children}</main>
                <Footer />
            </body>
        </html>
    );
}
