const { task } = require("hardhat/config");
const { getEnvVariable, getContract, getAccount } = require("./helpers");

const SINGLE_PIGEON_OPTION = 0;
const MULTIPLE_PIGEON_OPTION = 1;
const ALL_PIGEON_OPTION = 2;

const account = getAccount();
const OWNER_ADDRESS = getEnvVariable("OWNER_ADDRESS");
const NFT_CONTRACT_ADDRESS = getEnvVariable("NFT_CONTRACT_ADDRESS");
const FACTORY_CONTRACT_ADDRESS = getEnvVariable("FACTORY_CONTRACT_ADDRESS");

task("mintOne", "Mints from the Pigeon contract").setAction(async function (
  taskArgs,
  hre
) {
  try {
    const contract = await getContract(
      "PigeonFactory",
      FACTORY_CONTRACT_ADDRESS,
      hre
    );
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
      const contract = await getContract(
        "PigeonFactory",
        FACTORY_CONTRACT_ADDRESS,
        hre
      );
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
    const contract = await getContract(
      "PigeonFactory",
      FACTORY_CONTRACT_ADDRESS,
      hre
    );
    const transactionResponse = await contract.mint(
      ALL_PIGEON_OPTION,
      OWNER_ADDRESS,
      {
        gasLimit: 8000000,
      }
    );
    console.log(`Transaction Hash: ${transactionResponse.hash}`);
  } catch (error) {
    console.log(error);
  }
});

task("token-uri", "Fetches the token metadata for the given token ID")
  .addParam("tokenId", "The tokenID to fetch metadata for")
  .setAction(async function (taskArguments, hre) {
    const contract = await getContract("Pigeon", NFT_CONTRACT_ADDRESS, hre);
    const response = await contract.tokenURI(taskArguments.tokenId, {
      gasLimit: 500_000,
    });

    const metadata_url = response;
    console.log(`Metadata URL: ${metadata_url}`);

    const metadata = await fetch(metadata_url).then(res => res.json());
    console.log(`Metadata fetch response: ${JSON.stringify(metadata, null, 2)}`);
  });
