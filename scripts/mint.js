const { task } = require("hardhat/config");
const { getEnvVariable, getContract } = require("./helpers");

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
