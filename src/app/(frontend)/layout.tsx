import type { Metadata } from "next";
import "@/styles/globals.css";
import { Poppins, Montserrat, Mulish } from "next/font/google";
import Script from "next/script";
import { Toaster } from "@/components/ui/toaster";
import Icons, {IconGradients} from "@/components/PropertyPage/Icons";

// Google Fonts
const poppins = Poppins({
  weight: ["100", "300", "400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins"
});

const montserrat = Montserrat({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});

const mulish = Mulish({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Welcome to property.new",
  description:
    "A modern real estate web application featuring interactive maps, property listings, and more.",
  metadataBase: new URL("https://property.new"),
  openGraph: {
    title: "Welcome to property.new",
    description:
      "A modern real estate web application featuring interactive maps, property listings, and more.",
    url: "https://property.new",
    siteName: "property.new",
    type: "website",
    images: [
      {
        url: "https://property.new/og-image.png", // Preview image
        width: 1200,
        height: 630,
        alt: "property.new - Real Estate Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Welcome to property.new",
    description:
      "A modern real estate web application featuring interactive maps, property listings, and more.",
    images: ["https://property.new/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no viewport-fit=cover"
        />

        {/* Optional fallback for extra reliability */}
        <meta property="og:image" content="https://property.new/og-image.png" />
        <meta property="og:title" content="Welcome to property.new" />
        <meta
          property="og:description"
          content="A modern real estate web application featuring interactive maps, property listings, and more."
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:image"
          content="https://property.new/og-image.png"
        />

        {/* Microsoft Clarity */}
        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
                                    (function(c,l,a,r,i,t,y){
                                    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                                    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                                    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                                    })(window,document,"clarity","script","s95up1jp22");
                                `,
          }}
        />
      </head>
      <body
        className={`${mulish.className} ${poppins.variable} ${montserrat.variable} `}
      >
        <IconGradients />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
