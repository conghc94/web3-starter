import { AppProviders } from "@/components/AppProviders";
import "@rainbow-me/rainbowkit/styles.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import "@/styles/globals.css";
import { getMetadata } from "@/utils/getMetaData";

export const metadata = getMetadata({
  title: "Test dApp by daningyn",
  description: "Built with daningyn",
});

const ScaffoldEthApp = ({ children }: { children: React.ReactNode }) => {
  return (
    <html suppressHydrationWarning>
      <body>
        <ThemeProvider enableSystem>
          <AppProviders>{children}</AppProviders>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default ScaffoldEthApp;
