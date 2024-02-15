'use client';

import { ethers } from 'ethers';
import React, { useCallback, useEffect, useState } from 'react';
import { Commet } from 'react-loading-indicators';

import { CONTRACT_ADDRESS } from '@/constants';
import CONTRACT_ABI from '@/constants/ABI.json';
import { useEthereumProvider } from '@/hooks/useEthereumProvider';
import useLocalStorage from '@/hooks/useLocalStorage';

interface Props {
  address: `0x${string}` | undefined;
  isDisconnected: boolean;
}

interface GatewayDeployedEvent {
  event: string;
  args?: {
    gatewayAddr: string;
  };
}

const GatewayDeployment: React.FC<Props> = ({ address, isDisconnected }) => {
  const [deploying, setDeploying] = useState(false);
  const [gatewayAddr, setGatewayAddr] = useLocalStorage('gatewayAddr', '');
  const { getProvider } = useEthereumProvider();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const deployGateway = useCallback(async () => {
    if (!address) {
      console.error('No connected address found.');
      return;
    }
    setDeploying(true);

    try {
      const provider = getProvider();
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      const tx = await contract.deployGateway(address);
      const receipt = await tx.wait();

      const deployedContractAddress = receipt.events?.find(
        (event: GatewayDeployedEvent) => event.event === 'GatewayDeployed',
      )?.args?.gatewayAddr as string;
      if (deployedContractAddress) {
        setGatewayAddr(deployedContractAddress);
      } else {
        console.error('Deployed contract address not found.');
      }
    } catch (error) {
      console.error('Error deploying gateway:', error);
    } finally {
      setDeploying(false);
    }
  }, [address, getProvider, setGatewayAddr]);

  return (
    <div className="flex flex-col items-center justify-center flex-1">
      <div className="flex flex-col items-center gap-4">
        {hasMounted && gatewayAddr && (
          <span className="text-white">Gateway Address: {gatewayAddr}</span>
        )}

        {deploying ? (
          <button className="flex items-center justify-center gap-2 min-w-[190px] inline-block rounded-xl bg-blue-500 px-6 py-2.5 text-sm font-medium uppercase leading-normal text-neutral-50">
            <span>Deploying... &nbsp;</span>
            <Commet
              color="#0082F6"
              size="small"
              text=""
              textColor=""
              style={{ fontSize: '3px', color: 'white' }}
            />
          </button>
        ) : (
          <button
            className="min-w-[190px] inline-block rounded-xl bg-blue-500 px-6 py-2.5 text-sm font-medium uppercase leading-normal text-neutral-50"
            onClick={deployGateway}
            disabled={isDisconnected || deploying}
          >
            {hasMounted && gatewayAddr ? 'Deploy new Gateway' : 'Deploy Gateway'}
          </button>
        )}
      </div>
    </div>
  );
};

export default GatewayDeployment;
