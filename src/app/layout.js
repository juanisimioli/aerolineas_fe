import "./globals.css";
import ThemeRegistry from "@/styles/ThemeRegistry";
import { Inter } from "next/font/google";
import { AerolineasContextProvider } from "@/contexts/AerolineasContext";
import { MetamaskContextProvider } from "@/contexts/MetamaskContext";
import Navigator from "@/components/Navigator/Navigator";
import ToastProvider from "@/hooks/useToast";
import Toast from "@/components/Toast/Toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Aerolineas",
  description: "Buy flight tickets on blockchain",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ThemeRegistry>
        <ToastProvider>
          <MetamaskContextProvider>
            <AerolineasContextProvider>
              <body className={inter.className}>
                <Navigator>{children}</Navigator>
                <Toast />
              </body>
            </AerolineasContextProvider>
          </MetamaskContextProvider>
        </ToastProvider>
      </ThemeRegistry>
    </html>
  );
}
