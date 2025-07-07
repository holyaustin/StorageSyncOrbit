'use client';

import { RainbowKitProvider, getDefaultConfig } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { flowTestnet, avalancheFuji, filecoinCalibration, filecoin, flowMainnet } from 'wagmi/chains';

const queryClient = new QueryClient();

const config = getDefaultConfig({
  appName: 'StorageSyncOrbit',
  projectId: 'WALLETCONNECT_PROJECT_ID',
  chains: [flowTestnet, avalancheFuji, filecoinCalibration, filecoin, flowMainnet],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

export default function ContextProvider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
