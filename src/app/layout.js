import AuthProvider from "@/services/AuthProvider";
import localFont from "next/font/local";
import TanStackProvider from "providers/TanstackProvider";
import { Toaster } from "react-hot-toast";
import "./globals.css";
// import Modal from "react-modal";

// Modal.setAppElement("#__next");

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// aikhane kiso real information dia chage korte hobe for SEO
export const metadata = {
  title: {
    default: "Readora",
    template: "%s | Readora",
  },
  description:
    "Discover, explore, and buy books online at Readora - your go-to platform for novels, educational resources, self-development, children's books, and more.",
  keywords: [
    "Readora",
    "online bookstore",
    "buy books online",
    "novels",
    "self-development books",
    "children's books",
    "educational books",
    "book shop",
    "Bangla books",
    "literature",
  ],
  author: "Readora Team",
  openGraph: {
    title: "Readora - Your Online Bookstore",
    description:
      "Discover and buy your favorite books online at Readora. From novels to educational resources, we have a wide range of categories.",
    type: "website",
    url: "https://readora.shop",
    images: [
      {
        url: "https://i.ibb.co.com/SfNwSrp/Whats-App-Image-2024-10-10-at-11-12-02-PM-removebg-preview-1.png", // replace with actual image URL
        width: 1200,
        height: 630,
        alt: "Readora - Your Online Bookstore",
      },
    ],
  },
  twitter: {
    card: "Readora logo",
    title: "Readora - Your Online Bookstore",
    description: "Discover and buy your favorite books online at Readora.",
    images: [
      "https://res.cloudinary.com/dqdircc96/image/upload/v1745676650/Logo_R1_T_modify_large_scale_lx6gvd.png",
    ], // replace with actual image URL
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={``}>
        <TanStackProvider>
          <AuthProvider>
            {children}
            <Toaster></Toaster>
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
