import "./globals.css";
import ThemeRegistry from "@/styles/ThemeRegistry";
import { Roboto } from "next/font/google";
import Header from "@/components/Header/Header";
import Content from "@/components/Content/Content";
import Toast from "@/components/Toast/Toast";
import { AerolineasContextProvider } from "@/contexts/useAerolineasContext";
import { MetamaskContextProvider } from "@/contexts/useMetamaskContext";
import ToastProvider from "@/hooks/useToast";

export const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

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
              <body className={roboto.className}>
                <Header />
                <Content>{children}</Content>
                <Toast />
              </body>
            </AerolineasContextProvider>
          </MetamaskContextProvider>
        </ToastProvider>
      </ThemeRegistry>
    </html>
  );
}
