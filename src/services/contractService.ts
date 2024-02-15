import { ethers } from 'ethers';

import { CONTRACT_ADDRESS } from '@/constants';
import CONTRACT_ABI from '@/constants/ABI.json';

async function deployGatewayContract(address: string): Promise<string> {
  if (!address) throw new Error('No connected address found.');
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
  const transaction = await contract.deployGateway(address);
  const receipt = await transaction.wait();
  const deployedContractAddress = receipt.events?.[0]?.args?.gatewayAddr;
  if (!deployedContractAddress) throw new Error('Deployed contract address not found.');
  return deployedContractAddress;
}

export { deployGatewayContract };
