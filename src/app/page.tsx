'use client';

import { useWeb3Modal } from '@web3modal/wagmi/react';
import React from 'react';
import { useAccount, useDisconnect } from 'wagmi';

import ConnectButton from '@/components/ConnectButton';
import { truncateAddress } from '@/helpers';

export default function Home() {
  const { address, isConnecting, isDisconnected } = useAccount();
  const { open } = useWeb3Modal();
  const { disconnect } = useDisconnect();

  return (
    <main className="flex flex-1 flex-col">
      <nav className="flex justify-end items-center p-4 text-white border-b border-gray-100/30 gap-4">
        <div className="flex items-center gap-4">
          {address && <p>{truncateAddress(address)}</p>}
          <ConnectButton
            isConnecting={isConnecting}
            openModal={() => open()}
            disconnect={disconnect}
            isDisconnected={isDisconnected}
          />
        </div>
      </nav>
    </main>
  );
}
