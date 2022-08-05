require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("./scripts/deploy_with_param");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: "0.8.9",
    networks: {
        mumbai: {
            url: process.env.MUMBAI_RPC,
            accounts: [process.env.PRIVATE_KEY],
        },
    },
};