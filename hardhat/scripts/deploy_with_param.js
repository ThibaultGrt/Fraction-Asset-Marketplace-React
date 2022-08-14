// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
require("hardhat/config");
fs = require("fs");

chainId = "0x13881";
task(
        "deployParam",
        "deploy Fraction asset with parameters: name, shares, price are passed in cmd parameter"
    )
    .addPositionalParam("name")
    .addPositionalParam("shares")
    .addPositionalParam("price")
    .setAction(async(taskArgs, hre) => {
        const ethers = hre.ethers;
        const priceEthers = String(taskArgs.price);
        const nameVal = String(taskArgs.name);
        const sharesVal = parseInt(taskArgs.shares);
        const priceVal = ethers.utils.parseEther(priceEthers);
        console.log(nameVal);
        console.log(sharesVal);
        console.log(priceVal);
        // Contracts are deployed using the first signer/account by default
        const [owner, bob, otherAccount] = await ethers.getSigners();

        const fractionAssetContract = await ethers.getContractFactory(
            "FractionAsset"
        );
        const fractionAsset = await fractionAssetContract.deploy(
            nameVal,
            sharesVal,
            priceVal
        );

        res = await fractionAsset.deployed();

        console.log(`Deployed to:  ${fractionAsset.address}`);

        updateDeployedContracts(fractionAsset.address);
    });

function updateDeployedContracts(newContractAddr) {
    const entry = { addr: newContractAddr };
    var file = "../src/contracts/deployedContracts.json";
    var m = JSON.parse(fs.readFileSync(file).toString());
    m[chainId].push(entry);
    console.log(m);
    fs.writeFileSync(file, JSON.stringify(m));
}