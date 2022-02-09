const { task } = require("hardhat/config");
const { getEnvVariable, getContract, getAccount } = require("./helpers");

const SINGLE_PIGEON_OPTION = 0;
const MULTIPLE_PIGEON_OPTION = 1;
const ALL_PIGEON_OPTION = 2;

const account = getAccount();
const OWNER_ADDRESS = getEnvVariable("OWNER_ADDRESS");

task("mintOne", "Mints from the Pigeon contract").setAction(async function (
  taskArgs,
  hre
) {
  try {
    const contract = await getContract("PigeonFactory", hre);
    const transactionResponse = await contract.mint(
      SINGLE_PIGEON_OPTION,
      OWNER_ADDRESS,
      {
        gasLimit: 5000000,
      }
    );
    console.log(`Transaction Hash: ${transactionResponse.hash}`);
  } catch (error) {
    console.log(error);
  }
});

task("mintMulti", "Multiple mints from the Pigeon contract").setAction(
  async function (taskArgs, hre) {
    try {
      const contract = await getContract("PigeonFactory", hre);
      const transactionResponse = await contract.mint(
        MULTIPLE_PIGEON_OPTION,
        OWNER_ADDRESS,
        {
          gasLimit: 5000000,
        }
      );
      console.log(`Transaction Hash: ${transactionResponse.hash}`);
    } catch (error) {
      console.log(error);
    }
  }
);

task("mintAll", "Mints all from the Pigeon contract").setAction(async function (
  taskArgs,
  hre
) {
  try {
    const contract = await getContract("PigeonFactory", hre);
    const transactionResponse = await contract.mint(
      ALL_PIGEON_OPTION,
      OWNER_ADDRESS,
      {
        gasLimit: 5000000,
      }
    );
    console.log(`Transaction Hash: ${transactionResponse.hash}`);
  } catch (error) {
    console.log(error);
  }
});
