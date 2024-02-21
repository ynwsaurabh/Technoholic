import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "@/Component/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Technoholic - Where Knowledge Meets Innovation.",
  description: "Where Knowledge Meets Innovation.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        {children}
        <Footer />
        <ToastContainer />
      </body>
    </html>
  );
}
