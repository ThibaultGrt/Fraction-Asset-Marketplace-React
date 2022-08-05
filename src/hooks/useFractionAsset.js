import { getNativeByChain } from "helpers/networks";
import { useEffect, useMemo, useState } from "react";
import { BigNumber, ethers } from "ethers";
import LogoImg from "../assets/logo_without_name.png";

import fractionAssetContractJSON from "../contracts/FractionAsset.sol/FractionAsset.json";

import deployedContractsJSON from "contracts/deployedContracts.json";

export const useFractionAsset = () => {
    const chainId = "0x13881";
    const fallbackImg = LogoImg;

    const [provider, setProvider] = useState();
    const [signer, setSigner] = useState();
    const [accounts, setAccounts] = useState();

    const deployedContracts = deployedContractsJSON[chainId];
    const fractionAssetABI = fractionAssetContractJSON.abi;

    const [assets, setAssets] = useState([]);

    useEffect(() => {
        let allAssets = [];
        let prov = "";
        let accs = "";

        (async() => {
            const allAssets = [];
            const prov = new ethers.providers.Web3Provider(window.ethereum);
            const accounts = await prov.send("eth_requestAccounts", []);

            const sign = await prov.getSigner();

            for (const contractMetadata of deployedContracts) {
                const contract = new ethers.Contract(
                    contractMetadata.addr,
                    fractionAssetABI,
                    prov
                );

                const nameVal = await contract.name();
                const sharesVal = await contract.shares();
                const availableSharesVal =
                    sharesVal - (await contract.totalOwnedShares());
                const priceVal = (await contract.sharePrice()) / 10 ** 18;
                const ownedSharesVal = await contract.balanceOf(accounts[0]);
                const asset = {
                    name: nameVal,
                    addr: contractMetadata.addr,
                    image: fallbackImg,
                    shares: sharesVal,
                    availableShares: availableSharesVal,
                    price: priceVal,
                    ownedShares: ownedSharesVal,
                    contract: contract,
                };
                allAssets.push(asset);
            }
            setAccounts(accs);
            setSigner(sign);
            setAssets(allAssets);
        })();
    }, []);

    return {
        chainId,
        signer,
        assets,
        accounts,
    };
};