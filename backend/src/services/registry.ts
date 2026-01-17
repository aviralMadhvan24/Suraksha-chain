import { ethers } from "ethers";
import { hashIdentifier } from "../utils/hash";
import fraudRegistryAbi from "../abis/FraudRegistry.json";

export interface RegistryResult {
  verified: boolean;
  reportCount: number;
}

/**
 * Lazy-initialized contract getter
 * (avoids env timing issues)
 */
function getContract() {
  const rpcUrl = process.env.RPC_URL;
  const privateKey = process.env.PRIVATE_KEY;
  const contractAddress = process.env.FRAUD_REGISTRY_ADDRESS;

  if (!rpcUrl || !privateKey || !contractAddress) {
    return null;
  }

  const provider = new ethers.JsonRpcProvider(rpcUrl);
  const wallet = new ethers.Wallet(privateKey, provider);

  return new ethers.Contract(contractAddress, fraudRegistryAbi, wallet);
}

export async function checkRegistry(
  identifier: string,
): Promise<RegistryResult> {
  const contract = getContract();
  if (!contract) {
  return { verified: false, reportCount: 0 };
}

  const identifierHash = hashIdentifier(identifier);

  const [verified, reportCount] = await contract.isFraud(identifierHash);

  return {
    verified,
    reportCount: Number(reportCount),
  };
}
