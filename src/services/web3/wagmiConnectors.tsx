import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import {
    coinbaseWallet,
    ledgerWallet,
    metaMaskWallet,
    safeWallet,
    walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { rainbowkitBurnerWallet } from "burner-connector";
import * as chains from "viem/chains";
import web3Config from "@/web3.config";

const { onlyLocalBurnerWallet, targetNetworks } = web3Config;

const wallets = [
    metaMaskWallet,
    walletConnectWallet,
    ledgerWallet,
    coinbaseWallet,
    safeWallet,
    ...(!targetNetworks.some(network => network.id !== (chains.hardhat as chains.Chain).id) || !onlyLocalBurnerWallet
        ? [rainbowkitBurnerWallet]
        : []),
];

/**
 * wagmi connectors for the wagmi context
 */
export const wagmiConnectors = connectorsForWallets(
    [
        {
            groupName: "Supported Wallets",
            wallets,
        },
    ],
    {
        appName: process.env.PROJECT_NAME || "Template dApp by daningyn",
        projectId: web3Config.walletConnectProjectId,
    },
);
