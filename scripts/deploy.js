const { task } = require("hardhat/config");
const { getAccount, getEnvVariable } = require("./helpers");

task("deploy", "Deploys the Pastel Pigeon NFT contract").setAction(
  async function (taskArgs, hre) {
    const pigeonContract = await hre.ethers.getContractFactory(
      "Pigeon",
      getAccount()
    );
    const pigeon = await pigeonContract.deploy(getEnvVariable("PROXY_ADDRESS"));
    console.log(`NFT Contract deployed to address: ${pigeon.address}`);
    const factoryContract = await hre.ethers.getContractFactory(
      "PigeonFactory",
      getAccount()
    );
    const factory = await factoryContract.deploy(
      getEnvVariable("PROXY_ADDRESS"),
      pigeon.address
    );
    await pigeon.transferOwnership(factory.address);
    console.log(`Factory Contract deployed to address: ${factory.address}`);
  }
);
