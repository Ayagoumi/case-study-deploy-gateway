'use client';

import { useWeb3Modal } from '@web3modal/wagmi/react';
import React from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';

import GatewayDeployment from '@/components/GatewayDeployment';
import Navbar from '@/components/Navbar';

const Home: React.FC = () => {
  const { connect, connectors } = useConnect();
  const { address, isConnecting, isDisconnected } = useAccount();
  const { open } = useWeb3Modal();
  const { disconnect } = useDisconnect();

  const openModal = () => {
    try {
      open();
      if (!address && connectors.length > 0 && connectors[0]) {
        connect({ connector: connectors[0] });
      }
    } catch (error) {
      console.error('Error opening modal:', error);
    }
  };

  return (
    <main className="flex flex-1 flex-col">
      <Navbar
        address={address}
        isConnecting={isConnecting}
        openModal={openModal}
        disconnect={disconnect}
        isDisconnected={isDisconnected}
      />
      {!isDisconnected && !isConnecting ? (
        <GatewayDeployment address={address} isDisconnected={isDisconnected} />
      ) : (
        <div className="flex flex-col items-center justify-center flex-1">
          <span className="text-white text-2xl font-bold">
            Nerif
            <span className="text-blue-500">.</span>
          </span>
        </div>
      )}
    </main>
  );
};

export default Home;
