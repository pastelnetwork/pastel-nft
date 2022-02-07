const { task } = require("hardhat/config");
const { getEnvVariable, getContract } = require("./helpers");

task("mint", "Mints from the Pigeon contract")
  .addParam("address", "The address to receive a token")
  .setAction(async function (taskArgs, hre) {
    const contract = await getContract("Pigeon", hre);
    const transactionResponse = await contract.mintTo(
      taskArgs.address || getEnvVariable("OWNER_ADDRESS"),
      {
        gasLimit: 500_000,
      }
    );
    console.log(`Transaction Hash: ${transactionResponse.hash}`);
  });
