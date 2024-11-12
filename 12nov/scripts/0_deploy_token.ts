import { DeployFunction, Deployer, Network } from "@alephium/cli";
import { Settings } from "../alephium.config";
import { Token } from "../artifacts/ts/Token";

const deployToken: DeployFunction<Settings> = async (
  deployer: Deployer,
  network: Network<Settings>
) => {
  const result = await deployer.deployContract(Token, {
    issueTokenAmount: 10000n,
    initialFields: {
      name: Buffer.from("LPU Token", "utf-8").toString(),
      symbol: Buffer.from("LPU", "utf-8").toString(),
      decimals: 2n,
      supply: 10000n,
    },
    issueTokenTo: deployer.account.address,
  });

  const contractAddress = result.contractInstance.address;
  const tokenId = result.contractInstance.contractId;
  console.log(`Token deployed at ${contractAddress} with token id ${tokenId}`);
};
