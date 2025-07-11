import { WalletConnect } from '@/components/walletConnect';

import Footer from '../components/footer';
import Header from '../components/header';

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-purple-900 to-black">
      <Header />
      <div>
        <div
          className="relative w-full pt-24 pb-20 m-auto flex justify-center text-center flex-col items-center z-1 text-white"
          style={{ maxWidth: '1200px' }}
        >
          <h1 className="inline-block max-w-2xl lg:max-w-4xl text-pink-300 w-auto relative text-5xl md:text-6xl lg:text-7xl tracking-tighter mb-10 font-bold">
            StorageSyncOrbit
          </h1>
          <h1 className="inline-block max-w-2xl lg:max-w-4xl  w-auto relative text-5xl md:text-6xl lg:text-7xl tracking-tighter mb-10 font-bold">
            A cross-chain data bridge protocol for decentralized storage on Filecoin{' '}
          </h1>
          <p className="text-2xl mb-5">Orbiting across blockchains to unify data storage.</p>
          <WalletConnect />
        </div>
      </div>
      <Footer />
    </div>
  );
}
