import type { Metadata, Viewport } from "next";
import { Inter, Oswald } from "next/font/google";
import { Toaster } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ToastIcon from "@/components/ToastIcon";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const oswald = Oswald({ variable: "--font-oswald", subsets: ["latin"], weight: ["500", "600", "700"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://liftledger-app.vercel.app"),
  title: {
    default: "FitLog — Workout Library",
    template: "%s | FitLog",
  },
  description:
    "FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.",
  openGraph: {
    title: "FitLog — Workout Library",
    description: "Pick a lift, lock it into today's plan, log every set.",
    images: ["/banner.png"],
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0c0d10",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${oswald.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
        <Toaster
          theme="dark"
          position="top-right"
          icons={{
            success: <ToastIcon type="success" />,
            error: <ToastIcon type="error" />,
          }}
          offset={{ top: 14, right: 24 }}
          mobileOffset={{ top: 12, right: 16 }}
          toastOptions={{ className: "fitlog-toast" }}
        />
      </body>
    </html>
  );
}
