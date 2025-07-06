// useContractAddress.ts
import { useAccount, useSwitchChain } from 'wagmi';
import { useEffect, useState } from 'react';
import { FUJI_ONRAMP_CONTRACT_ADDRESS, FLOW_ONRAMP_CONTRACT_ADDRESS } from '@components/contracts/onrampContract';

// Define a branded type for EVM addresses
type EvmAddress = `0x${string}`;

export function useContractAddress() {
  const { isConnected, chainId } = useAccount(); // chainId is a number (e.g., 654 for Flow Testnet)
  const { switchChain } = useSwitchChain(); // For network switching
  const [contractAddress, setContractAddress] = useState<EvmAddress>(FLOW_ONRAMP_CONTRACT_ADDRESS); // Default to Flow address


   useEffect(() => {
     if (!isConnected) return;
 
     if (chainId === 545) {
       // Flow EVM Testnet
       setContractAddress(FLOW_ONRAMP_CONTRACT_ADDRESS);
     } else if (chainId === 43113) {
       // Avalanche Fuji
       setContractAddress(FUJI_ONRAMP_CONTRACT_ADDRESS);
     } else {
       //setContractAddress("Network not supported");
       // Optional: Prompt user to switch
       switchChain({ chainId: 545 }); // Flow EVM
     }
   }, [isConnected, chainId, switchChain]);
 
   return contractAddress;
 }
