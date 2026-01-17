import { keccak256, toUtf8Bytes } from "ethers";

export function hashIdentifier(identifier: string): string {
  return keccak256(toUtf8Bytes(identifier.toLowerCase().trim()));
}
