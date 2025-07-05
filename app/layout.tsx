import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Poppins } from "next/font/google";

import '@styles/globals.css';

import { ContextProvider } from '.';
import ReactQueryProvider from './ReactQueryProvider';

// const inter = Inter({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'], display: 'swap', adjustFontFallback: false})

const poppins = Poppins({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  display: "swap",
});

// Websit Config
export const metadata: Metadata = {
  title: 'StorageSyncOrbit',
  description: 'Filecoin-powered multi-chain data bridge hub for decentralized storage automation, evokes celestial coordination and seamless synchronization of storage systems across multiple L1 and L2 chains.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/**<body className={`${poppins.className} ...`}> */}
      <body className={inter.className}>
        <ReactQueryProvider>
          <ContextProvider>{children}</ContextProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
