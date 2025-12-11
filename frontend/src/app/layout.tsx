import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/providers/auth-provider";
import { Toaster } from "@/components/ui/sonner";
import NextTopLoader from 'nextjs-toploader';
import { ThemeProvider } from "@/components/layout/Theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Homigo",
  description: "Homigo - Nền tảng đặt phòng, thuê nhà và tìm kiếm homestay tiện lợi. Khám phá hàng ngàn chỗ ở và dịch vụ , phù hợp cho kỳ nghỉ, công tác hoặc lưu trú dài hạn.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning={true}>
        <NextTopLoader 
          color="oklch(0.48 0.16 265)" 
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px oklch(0.48 0.16 265),0 0 5px oklch(0.48 0.16 265)"
        />
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <AuthProvider>{children}</AuthProvider>
            <Toaster />
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
