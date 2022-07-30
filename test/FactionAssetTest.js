const {
    loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");

describe("FractionAsset", function() {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshopt in every test.

    const name = "Toptal Fraction Asset";
    const shares = 100;
    const priceEthers = "100";
    const price = ethers.utils.parseEther(priceEthers);
    const sharePrice = 1;


    async function BuyFractionAsset() {

        // Contracts are deployed using the first signer/account by default
        const [owner, bob, otherAccount] = await ethers.getSigners();

        const fractionAssetContract = await ethers.getContractFactory("FractionAsset");
        const fractionAsset = await fractionAssetContract.deploy(name, shares, price);
        await fractionAsset.connect(bob).buyFractions(shares, { value: price });
        return { fractionAsset, owner, bob, name, shares, price };

    }

    async function deployFractionAsset() {

        // Contracts are deployed using the first signer/account by default
        const [owner, bob, otherAccount] = await ethers.getSigners();

        const fractionAssetContract = await ethers.getContractFactory("FractionAsset");
        const fractionAsset = await fractionAssetContract.deploy(name, shares, price);

        return { fractionAsset, owner, bob, name, shares, price };

    }


    describe("Deployment", function() {

        it("Should set the right owner", async function() {
            const { fractionAsset, owner } = await loadFixture(deployFractionAsset);

            expect(await fractionAsset.owner()).to.equal(owner.address);
        });

        it("Should revert if deployed with more less than 2", async function() {

            const fractionAssetContract = await ethers.getContractFactory("FractionAsset");
            await expect(fractionAssetContract.deploy(name, 1, price)).to.be.revertedWith("Not enough fracitons.");

        });

        it("Should revert if name not set", async function() {
            const fractionAssetContract = await ethers.getContractFactory("FractionAsset");
            await expect(fractionAssetContract.deploy("", shares, price)).to.be.revertedWith("Asset name should be set.");

        });
        it("Should revert if price is equal to 0", async function() {
            const fractionAssetContract = await ethers.getContractFactory("FractionAsset");
            await expect(fractionAssetContract.deploy(name, shares, 0)).to.be.revertedWith("Price should be set.");

        });
        // TODO test the price of shares.
    });

    describe("Acquire Shares", function() {
        describe("Validations", function() {

            it("Should revert with the right error if not enough shares available", async function() {
                const { fractionAsset, bob } = await loadFixture(deployFractionAsset);
                await expect(fractionAsset.connect(bob).buyFractions(101, { value: price })).to.be.revertedWith("Not enough fractions available.");; // only 100 available;

            });
            it("Should revert with the right error not enough ethers", async function() {
                const { fractionAsset, bob } = await loadFixture(deployFractionAsset);
                await expect(fractionAsset.connect(bob).buyFractions(100, { value: 1 })).to.be.revertedWith("Not enough ethers.");;
            });

        })
    });

    describe("Buy fractions", function() {
        it("Should emit an event on buying fractions", async function() {
            const { fractionAsset, bob } = await loadFixture(deployFractionAsset);

            await expect(fractionAsset.connect(bob).buyFractions(shares, { value: price })).to.emit(fractionAsset, "BuyFractions");


        });
        it("Should update the buyers amount of shares", async function() {
            const { fractionAsset, bob } = await loadFixture(
                BuyFractionAsset
            );

            const bobFractions = await fractionAsset.balanceOf(bob.address);
            expect(bobFractions).to.equal(100);

        });
        it("Should transfer the funds to the owner", async function() {

            const { fractionAsset, owner, bob } = await loadFixture(
                deployFractionAsset
            );
            const ownerBalanceBefore = owner.getBalance();

            await fractionAsset.connect(bob).buyFractions(shares, { value: price });

            const ownerBalanceAfter = owner.getBalance();
            expect(ownerBalanceAfter > ownerBalanceBefore);

        });

    });

});