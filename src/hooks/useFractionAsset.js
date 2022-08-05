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

    const deployedContracts = deployedContractsJSON[chainId];
    const fractionAssetABI = fractionAssetContractJSON.abi;
    const [fractionAssetContracts, setfractionAssetContracts] = useState([]);

    const [assets, setAssets] = useState([]);
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        let allContracts = [];
        let allAssets = [];
        let prov = "";
        let accs = "";

        (async() => {
            const allContracts = [];
            const allAssets = [];
            const prov = new ethers.providers.Web3Provider(window.ethereum);

            const accs = await prov.send("eth_requestAccounts", []);

            setAccounts(accs);
            for (const contractMetadata of deployedContracts) {
                const contract = new ethers.Contract(
                    contractMetadata.addr,
                    fractionAssetABI,
                    prov
                );
                allContracts.push(contract);

                const asset = {
                    name: await contract.name(),
                    addr: contractMetadata.addr,
                    image: fallbackImg,
                    shares: await contract.shares(),
                    availableShares: await contract.totalOwnedShares(),
                    price: (await contract.sharePrice()) / 10 ** 18,
                    ownedShares: await contract.balanceOf(accs[0]),
                };
                allAssets.push(asset);
            }

            setfractionAssetContracts(allContracts);
            setAssets(allAssets);
        })();
    }, []);

    return {
        chainId,
        provider,
        accounts,
        fractionAssetContracts,
        assets,
    };
};