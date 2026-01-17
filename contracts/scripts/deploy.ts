import { ethers } from "hardhat";

async function main() {
  const FraudRegistry = await ethers.getContractFactory("FraudRegistry");
  const registry = await FraudRegistry.deploy();

  await registry.waitForDeployment();

  console.log("FraudRegistry deployed to:", await registry.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
