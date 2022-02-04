const { ethers } = require("ethers");

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

module.exports = {
  getEnvVariable,
  getProvider,
  getAccount,
};
