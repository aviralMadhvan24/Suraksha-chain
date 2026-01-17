import { hashIdentifier } from "../utils/hash";

export async function checkRegistry(identifier: string) {
  const identifierHash = hashIdentifier(identifier);

  // Later:
  // call smart contract with identifierHash

  return {
    verified: false,
    reportCount: 0,
  };
}
