const { ethers } = require("ethers");
const { getContractAt } = require("@nomiclabs/hardhat-ethers/internal/helpers");

const getEnvVariable = (key, defaultValue) => {
  if (process.env[key]) {
    return process.env[key];
  }
  if (!defaultValue) {
    throw `${key} is not defined and no default value was provided`;
  }
  return defaultValue;
};

const getProvider = () => {
  if (getEnvVariable("NETWORK", "localhost") === "localhost") {
    return new ethers.providers.JsonRpcProvider();
  } else {
    return ethers.getDefaultProvider(getEnvVariable("NETWORK", "rinkeby"), {
      alchemy: getEnvVariable("ALCHEMY_KEY"),
    });
  }
};

const getAccount = () => {
  return new ethers.Wallet(
    getEnvVariable("ACCOUNT_PRIVATE_KEY"),
    getProvider()
  );
};

const getContract = (contractName, hre) => {
  const account = getAccount();
  return getContractAt(
    hre,
    contractName,
    getEnvVariable("CONTRACT_ADDRESS"),
    account
  );
};

module.exports = {
  getEnvVariable,
  getProvider,
  getAccount,
  getContract,
};
