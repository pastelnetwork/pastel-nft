const { task } = require("hardhat/config");
const { getAccount, getEnvVariable, getContract } = require("./helpers");

const account = getAccount();
const proxyAddress = getEnvVariable("PROXY_ADDRESS");
const nftAddress = getEnvVariable("NFT_CONTRACT_ADDRESS");

task("deploy", "Deploys the Pastel Pigeon NFT/Factory contract").setAction(
  async function (taskArgs, hre) {
    try {
      const pigeonContract = await hre.ethers.getContractFactory(
        "Pigeon",
        account
      );
      const pigeon = await pigeonContract.deploy(proxyAddress);
      console.log(`NFT Contract deployed to address: ${pigeon.address}`);
      await pigeon.deployed();
      const factoryContract = await hre.ethers.getContractFactory(
        "PigeonFactory",
        account
      );
      const factory = await factoryContract.deploy(
        proxyAddress,
        pigeon.address
      );
      console.log(`Factory Contract deployed to address: ${factory.address}`);
      await pigeon.transferOwnership(factory.address, {
        gasLimit: 500000,
      });
      console.log("Transferred Ownership");
    } catch (error) {
      console.log(error);
    }
  }
);

task("deployNFT", "Deploys the Pastel Pigeon NFT contract").setAction(
  async function (taskArgs, hre) {
    try {
      const pigeonContract = await hre.ethers.getContractFactory(
        "Pigeon",
        account
      );
      const pigeon = await pigeonContract.deploy(proxyAddress);
      console.log(`NFT Contract deployed to address: ${pigeon.address}`);
    } catch (error) {
      console.log(error);
    }
  }
);

task("deployFactory", "Deploys the Pastel Pigeon Factory contract").setAction(
  async function (taskArgs, hre) {
    try {
      const pigeon = await getContract("Pigeon", nftAddress, hre);

      const factoryContract = await hre.ethers.getContractFactory(
        "PigeonFactory",
        account
      );
      const factory = await factoryContract.deploy(proxyAddress, nftAddress);
      console.log(`Factory Contract deployed to address: ${factory.address}`);
      await pigeon.transferOwnership(factory.address, {
        gasLimit: 500000,
      });
      console.log("Transferred ownership");
    } catch (error) {
      console.log(error);
    }
  }
);
