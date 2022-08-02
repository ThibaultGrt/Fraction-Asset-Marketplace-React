// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.

async function main() {
    const name = "Toptal Fraction Asset";
    const shares = 100;
    const priceEthers = "100";
    const price = ethers.utils.parseEther(priceEthers);
    const sharePrice = 1;
    // Contracts are deployed using the first signer/account by default
    const [owner, bob, otherAccount] = await ethers.getSigners();

    const fractionAssetContract = await ethers.getContractFactory(
        "FractionAsset"
    );
    const fractionAsset = await fractionAssetContract.deploy(name, shares, price);

    await fractionAsset.deployed();

    console.log("Lock with 1 ETH deployed to:", fractionAsset.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});