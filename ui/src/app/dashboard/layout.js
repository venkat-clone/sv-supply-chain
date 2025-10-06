import { Geist, Geist_Mono } from "next/font/google";
import Sidebar from "@/components/SideBar";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});


export const metadata = {
    title: 'My App',
    description: 'App with sidebar',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <body>
        <div className="flex">
            <Sidebar />
            <main className="flex-1 p-6">{children}</main>
        </div>
        </body>
        </html>
    );
}
