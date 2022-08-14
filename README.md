# Dependencies

Please consider installing the following dependencies to be able to run the project:

- Yarn - 1.22.19
- Node - v16.16.0
- NPM - 8.15.1

#💿 Clone the Repo and Install all dependencies:

####Web application installation

Clone the repository with your Gitlab account:

```
git clone https://git.toptal.com/screening/Jean-Loic-Mugnier.git
```

Install project and its dependencies with Yarn.

```
$ cd ./Jean-Loic-Mugnier/
$ yarn install
```

####Web application configuration

✏ Create .env in the main folder and provide your appId and serverUrl from Moralis
Example:

```
REACT_APP_MORALIS_APPLICATION_ID = xxxxxxxxxxxx
REACT_APP_MORALIS_SERVER_URL = https://xxxxxx.grandmoralis.com:2053/server

```

## Hardhat Setup

For setting up hardhat, create the following .env file under ./hardhat/.env

```
PRIVATE_KEY=76e98ec462***
MUMBAI_RPC=https://polygon-***

```

if you do not already have a RPC endpoint, we suggest the following service providers:

- [Alchemy](https://www.alchemy.com/overviews/private-rpc-endpoint)
- [Infura](https://blog.infura.io/post/polygon-now-available)

## Fraction Asset Contract

The Fraction Asset contract is type of contract that allows users to buy a fraction of the asset representated by the contract.
When the fractions are bought, the funds are send to the contract owner.
Such fractions cannot be resold.

for more technical details about the contract, check it [here](https://git.toptal.com/screening/Jean-Loic-Mugnier/-/blob/master/hardhat/contracts/FractionAsset.sol)

### Deploying new Contract

To deploy a new contract, please use the command line and more specifically, the harhat deployParam task. From inside the hardhat folder, run the command:

```
$ npx hardhat --network mumbai  deployParam [CONTRACT_NAME] [#_OF_FRACTIONS] [ASSET_PRICE]
```

Where:

- CONTRACT_NAME - Name of the smart contract to be deployed
- #\_OF_SHARES - Number of fractions available for the smart contract.
- ASSET*PRICE - price of the whole asset. \_Share price* will be calculated as it follows: `_assetPrice/#_shares`
  where #\_shares > 1
  and \_assetPrice >0

### Update new deployed contracts

The deployParam task updates the source of information for the web application. Therefore, when a new contract is deployed using the previous command, the application should deplay them in the UI.

the list of deployed contracts are located [here](https://git.toptal.com/screening/Jean-Loic-Mugnier/-/blob/master/src/contracts/deployedContracts.json)

# Start the application

Inside the project repository, run the following command:

```
$ yarn start

```

## Fraction Asset Tab

Displays the list of different deployed smart contracts available fro acquisition

## Your Collection Tab

Displays the list of different deployed smart contracts and the fractions you own.
