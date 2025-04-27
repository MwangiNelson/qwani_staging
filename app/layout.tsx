import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import "./website.css";
import "yet-another-react-lightbox/styles.css";
import { Toaster } from "sonner";
import { TanstackProvider } from "@/components/providers/tanstack_provider";
import { AuthContextProvider } from "@/components/providers/AuthContextProvider";

const inter = Inter({ subsets: ["latin"] });
const mont = Montserrat({
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
    title: {
    default: "Qwani",
    template: "%s | Qwani",
  },
  description: "Qwani is a youth lead initiative created as a platform for young talented writers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`
      ${mont.className} `}
      >
        <TanstackProvider>
          <AuthContextProvider>
          <Toaster/>
          {children}
          </AuthContextProvider>
     
        </TanstackProvider> 
      
      </body>
    </html>
  );
}
