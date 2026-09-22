import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.serviceexcellenceedge.com"),
  title: {
    default: "Service Excellence Edge | AI Transformation & IT Service Management",
    template: "%s | Service Excellence Edge",
  },
  description:
    "AI Automatisierung Beratung, IT Service Management Beratung und KI Agenten für Unternehmen in Deutschland und Europa. AI agents, workflow automation and ITSM consulting for enterprise operations.",
  keywords: [
    "AI Automation Consulting",
    "IT Service Management Consulting",
    "AI Agents for Business",
    "Workflow Automation Germany",
    "Process Intelligence",
    "KI Automatisierung Beratung",
    "IT Service Management Beratung",
    "KI Agenten Unternehmen",
    "Workflow Automatisierung Deutschland",
    "Prozessoptimierung KI",
  ],
  alternates: {
    languages: {
      en: "https://www.serviceexcellenceedge.com",
      de: "https://www.serviceexcellenceedge.com/de",
    },
  },
  openGraph: {
    title: "Service Excellence Edge | AI Transformation & IT Service Management",
    description: "Transform enterprise operations with AI-powered service excellence.",
    url: "https://www.serviceexcellenceedge.com",
    siteName: "Service Excellence Edge",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
