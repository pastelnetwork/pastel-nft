# Pastel Pigeon NFT

This project demonstrates a smart contract for Pastel Pigeon NFT.

## Deploy and test on local network(localhost:8545)

---

To run this smart contract on localhost network, you should run following commands.

```shell
npx hardhat node
```

In other terminal, you should run deploy script.

```shell
npx hardhat compile
npx hardhat deploy
```

In local node terminal, please copy the contract address and paste it to .env file. And then run this.

```
npx hardhat mint --address <RECIPIENT_ADDRESS>
```

## Deploy on Testnet(Ropsten)

---

- First, you need to create `.env` file and copy content of `.env.example` to it.

- Second, you have to fill `PRIVATE_KEY`, `INFURA_KEY`, `PROXY_ADDRESS`, `OWNER_ADDRESS` properties.

  Examples are like this.

  ```
  PRIVATE_KEY=0x7068f68fa16b982749a42865ab3a40bf70a9379a871c901b57051166xxxxxxxx
  INFURA_KEY=https://ropsten.infura.io/v3/07efcd14ae49448fb3cbdda8xxxxxxxx
  PROXY_ADDRESS=0xfACFE626d57181A890F130979322315cxxxxxxxx
  NETWORK=ropsten
  OWNER_ADDRESS=0x18f830Ec7c719aCA64Cc81659dF641fCxxxxxxxx
  ```

- Next, run the deploy script as following.

  ```shell
  npx hardhat compile
  npx hardhat deploy
  ```

  Its result will be like this.

  ```
  ========= NOTICE =========
  Request-Rate Exceeded  (this message will not be repeated)

  The default API keys for each service are provided as a highly-throttled,
  community resource for low-traffic projects and early prototyping.

  While your application will continue to function, we highly recommended
  signing up for your own API keys to improve performance, increase your
  request rate/limit and enable other perks, such as metrics and advanced APIs.

  For more details: https://docs.ethers.io/api-keys/
  ==========================
  Contract deployed to address: 0x3850e686Fa91CEFb271422AB880FAE681F408451
  ```

- Copy the deployed contract address and input it to `CONTRACT_ADDRESS` in `.env` file.

- Run mint script.

  ```shell
  npx hardhat mint
  ```

  The owner address will be set to `OWNER_ADDRESS` in `.env` file.
  It will output as following.

  ```
  ========= NOTICE =========
  Request-Rate Exceeded  (this message will not be repeated)

  The default API keys for each service are provided as a highly-throttled,
  community resource for low-traffic projects and early prototyping.

  While your application will continue to function, we highly recommended
  signing up for your own API keys to improve performance, increase your
  request rate/limit and enable other perks, such as metrics and advanced APIs.

  For more details: https://docs.ethers.io/api-keys/
  ==========================
  Transaction Hash: 0x7123ef2df56c571374a6d2945c4f447f50f161cf5cb4eb50e8b11411de9e0c8c
  ```

- Copy transaction hash and go to https://www.ropsten.etherscan.io and search by hash.
  You can see the result of transaction through etherscan.

- To mint all tokens(125 NFTs) once, you can run mintAll script.

  ```shell
  npx hardhat mintAll
  ```
