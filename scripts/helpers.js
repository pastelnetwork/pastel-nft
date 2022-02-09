const { ethers } = require("ethers");
const { getContractAt } = require("@nomiclabs/hardhat-ethers/internal/helpers");

const getEnvVariable = (key, defaultValue) => {
  if (process.env[key]) {
    return process.env[key];
  }
  if (!defaultValue) {
    console.error(`${key} is not defined and no default value was provided`);
    return "";
  }
  return defaultValue;
};

const getProvider = () => {
  if (getEnvVariable("NETWORK", "localhost") === "localhost") {
    return new ethers.providers.JsonRpcProvider();
  } else {
    return ethers.getDefaultProvider(getEnvVariable("NETWORK", "rinkeby"), {
      infura: getEnvVariable("INFURA_KEY"),
    });
  }
};

const getAccount = () => {
  return new ethers.Wallet(getEnvVariable("PRIVATE_KEY"), getProvider());
};

const getContract = (contractName, address, hre) => {
  const account = getAccount();
  return getContractAt(hre, contractName, address, account);
};

module.exports = {
  getEnvVariable,
  getProvider,
  getAccount,
  getContract,
};
