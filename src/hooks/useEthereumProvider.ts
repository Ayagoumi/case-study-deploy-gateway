import { ethers } from 'ethers';

export const useEthereumProvider = () => {
  const getProvider = () => {
    if (typeof window.ethereum !== 'undefined') {
      return new ethers.providers.Web3Provider(window.ethereum);
    }
    throw new Error('Ethereum provider not found');
  };

  return { getProvider };
};
