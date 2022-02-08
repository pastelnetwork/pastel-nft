const { task } = require("hardhat/config");
const { getEnvVariable, getContract } = require("./helpers");

const MAX_SUPPLY = 125;

task("mint", "Mints from the Pigeon contract").setAction(async function (
  taskArgs,
  hre
) {
  const contract = await getContract("Pigeon", hre);
  const transactionResponse = await contract.mint(
    getEnvVariable("OWNER_ADDRESS"),
    {
      gasLimit: 5000000,
    }
  );
  console.log(`Transaction Hash: ${transactionResponse.hash}`);
});

task("mintAll", "Mints all tokens from the Pigeon contract").setAction(
  async function (taskArgs, hre) {
    const contract = await getContract("Pigeon", hre);
    const currentSupply = await contract.totalSupply();

    for (let i = currentSupply; i < MAX_SUPPLY; i++) {
      const transactionResponse = await contract.mint(
        getEnvVariable("OWNER_ADDRESS"),
        {
          gasLimit: 5000000,
        }
      );
      console.log(`Minted PSP: ${transactionResponse.hash}`);
    }
  }
);
