const { task } = require("hardhat/config");
const { getAccount, getEnvVariable } = require("./helpers");

task("deploy", "Deploys the Pastel Pigeon NFT contract").setAction(
  async function (taskArgs, hre) {
    const pigeonContractFactory = await hre.ethers.getContractFactory(
      "Pigeon",
      getAccount()
    );
    const pigeon = await pigeonContractFactory.deploy(
      getEnvVariable("PROXY_ADDRESS")
    );
    console.log(`Contract deployed to address: ${pigeon.address}`);
  }
);
