const {
    time,
    loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");

describe("Lock", function() {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshopt in every test.
    async function deployFractionAsset() {

        const name = "Toptal Fraction Asset";
        const shares = 100;
        const priceEthers = "100";
        const price = ethers.utils.parseEther(priceEthers);
        const sharePrice = 1;

        // Contracts are deployed using the first signer/account by default
        const [owner, bob, otherAccount] = await ethers.getSigners();

        const fractionAssetContract = await ethers.getContractFactory("FractionAsset");
        const fractionAsset = await fractionAssetContract.deploy(name, shares);
        await contract.buyFractions.connect(bob).buyFractions(shares, { value: price });

    }

    async function BuyFractionAsset() {

        const name = "Toptal Fraction Asset";
        const shares = 100;
        const priceEthers = "100";
        const price = ethers.utils.parseEther(priceEthers);
        const sharePrice = 1;

        // Contracts are deployed using the first signer/account by default
        const [owner, bob, otherAccount] = await ethers.getSigners();


        const fractionAssetContract = await ethers.getContractFactory("FractionAsset");
        const fractionAsset = await fractionAssetContract.deploy(name, shares);

    }


    describe("Deployment", function() {

        it("Should set the right owner", async function() {
            const { contract } = await loadFixture(deployFractionAsset);
            console.log(contract);
            expect(await contract.owner()).to.equal(owner.address);
        });

        it("Should revert if deployed with more less than 2", async function() {

            const fractionAssetContract = await ethers.getContractFactory("FractionAsset");
            fractionAssetContract.deploy(name, 1, price).to.be.revertedWith("Not enough fracitons.");

        });

        it("Should revert if name not set", async function() {
            fractionAssetContract.deploy("", shares, price).to.be.revertedWith("Asset name should be set.");

        });
        it("Should revert if price is less or equal to 0", async function() {
            fractionAssetContract.deploy(name, shares, 0).to.be.revertedWith("Price should be set.");

        });
    });

    describe("Acquire Shares", function() {
        describe("Validations", function() {

            it("Should revert with the right error if not enough shares available", async function() {
                const { contract } = await loadFixture(deployFractionAsset);
                contract.buyFractions.connect(bob).buyFractions(101, { value: price }).to.be.revertedWith("Not enough fractions available.");; // only 100 available;

            });
            it("Should revert with the right error not enough ethers", async function() {
                const { contract } = await loadFixture(deployFractionAsset);
                contract.buyFractions.connect(bob).buyFractions(101, { value: 1 }).to.be.revertedWith("Not enough ethers.");;
            });

        })
    });

    describe("Buy fractions", function() {
        it("Should emit an event on buying fractions", async function() {
            const { contract } = await loadFixture(deployFractionAsset);

            await expect(contract.buyFractions.connect(bob).buyFractions(shares, { value: price }).to.be.revertedWith("Not enough fractions available."))
                .to.emit(contract, "BuyFraction");


        });
        it("Should update the buyers amount of shares", async function() {
            const { contract } = await loadFixture(
                deployFractionAsset
            );

            const bobFractions = await contract.balanceOf(bob);
            expect(bobFractions).to.equal(100);

        });
        it("Should transfer the funds to the owner", async function() {
            const ownerBalanceBefore = owner.getBalance();
            const { contract } = await loadFixture(
                deployFractionAsset
            );
            const ownerBalanceAfter = owner.getBalance();
            expect(ownerBalanceAfter.gt(ownerBalanceBefore));

        });

    });

});