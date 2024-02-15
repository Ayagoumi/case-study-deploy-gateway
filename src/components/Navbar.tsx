import React from 'react';

import ConnectButton from '@/components/ConnectButton';
import { truncateAddress } from '@/helpers';

interface NavbarProps {
  address?: string;
  isConnecting: boolean;
  openModal: () => void;
  disconnect: () => void;
  isDisconnected: boolean;
}

const Navbar: React.FC<NavbarProps> = ({
  address,
  isConnecting,
  openModal,
  disconnect,
  isDisconnected,
}) => {
  return (
    <nav className="flex justify-end items-center p-4 text-white border-b border-gray-100/30">
      <div className="flex items-center gap-4">
        {address && (
          <span className="hidden sm:block text-gray-300">{truncateAddress(address)}</span>
        )}
        <ConnectButton
          isConnecting={isConnecting}
          openModal={openModal}
          disconnect={disconnect}
          isDisconnected={isDisconnected}
        />
      </div>
    </nav>
  );
};

export default Navbar;
