import type { Metadata } from "next";
import { Inter, Montserrat, Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import "./website.css";
import "yet-another-react-lightbox/styles.css";
import { Toaster } from "sonner";
import { TanstackProvider } from "@/components/providers/tanstack_provider";
import { AuthContextProvider } from "@/components/providers/AuthContextProvider";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });
const mont = Montserrat({
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  weight: ["300", "400", "500", "600", "700"],
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
        {/* <Script
          src="https://onsite.optimonk.com/script.js?account=231860"
          strategy="afterInteractive"
        /> */}
        <script type="text/javascript" src="https://onsite.optimonk.com/script.js?account=231860" async></script>

        
      <body className={`${mont.className} ${playfair.variable} ${dmSans.variable}`}>
      
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