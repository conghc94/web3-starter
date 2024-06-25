"use client";

import { useEffect, useState } from "react";
import { RainbowKitProvider, darkTheme, lightTheme } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useTheme } from "next-themes";
import { WagmiProvider } from "wagmi";
import { wagmiConfig } from "@/services/web3/wagmiConfig";
import { ToastContainer } from "react-toastify";
import { BlockieAvatar } from "./web3/BlockieAvatar";
import Header from "./Header";
import Footer from "./Footer";
import { NextUIProvider } from "@nextui-org/react";

const MainApp = ({ children }: { children: React.ReactNode }) => {

    const { resolvedTheme } = useTheme();

    return (
        <NextUIProvider>
            <ToastContainer
                position='top-right'
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                draggable
                pauseOnHover={false}
                pauseOnFocusLoss={false}
                theme={resolvedTheme === "dark" ? "dark" : "light"}
            />
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="relative flex flex-col flex-1">{children}</main>
                <Footer />
            </div>
        </NextUIProvider>
    );
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          avatar={BlockieAvatar}
          theme={mounted ? (isDarkMode ? darkTheme() : lightTheme()) : lightTheme()}
        >
          <MainApp>{children}</MainApp>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
