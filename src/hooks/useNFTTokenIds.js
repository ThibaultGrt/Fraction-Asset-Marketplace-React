import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
import { useEffect, useState } from "react";
import { useMoralisWeb3Api, useMoralisWeb3ApiCall } from "react-moralis";
import { useIPFS } from "./useIPFS";

export const useNFTTokenIds = (addr) => {
    const { token } = useMoralisWeb3Api();
    const { chainId } = useMoralisDapp();
    const { resolveLink } = useIPFS();
    const [NFTTokenIds, setNFTTokenIds] = useState([]);
    const [totalNFTs, setTotalNFTs] = useState();
    const [fetchSuccess, setFetchSuccess] = useState(true);
    const {
        fetch: getNFTTokenIds,
        data,
        error,
        isLoading,
    } = useMoralisWeb3ApiCall(token.getAllTokenIds, {
        chain: chainId,
        address: addr,
        limit: 10,
    });

    useEffect(async() => {
        const dataResult =
            data === null || data === undefined ? undefined : data.result;
        console.log("HOOK - data");
        console.log(data);
        console.log("HOOK - addr");
        console.log(addr);
        console.log("HOOK - error");
        console.log(error);
        console.log("HOOK - isLoading");
        console.log(isLoading);
        if (dataResult) {
            const NFTs = data.result;
            setTotalNFTs(data.total);
            setFetchSuccess(true);
            for (let NFT of NFTs) {
                const metadata =
                    NFT === null || NFT === undefined ? undefined : NFT.metadata;
                const uri =
                    NFT === null || NFT === undefined ? undefined : NFT.token_uri;
                console.log("HOOK - metadata");
                console.log(metadata);
                console.log("HOOK - uri");
                console.log(uri);

                if (metadata) {
                    const image = NFT.metadata.image;
                    console.log("HOOK - image");
                    console.log(image);

                    NFT.image = resolveLink(image);
                } else if (uri) {
                    try {
                        await fetch(NFT.token_uri)
                            .then((response) => response.json())
                            .then((data) => {
                                NFT.image = resolveLink(data.image);
                            });
                    } catch (error) {
                        setFetchSuccess(false);

                        /*          !!Temporary work around to avoid CORS issues when retrieving NFT images!!
            Create a proxy server as per https://dev.to/terieyenike/how-to-create-a-proxy-server-on-heroku-5b5c
            Replace <your url here> with your proxy server_url below
            Remove comments :)

              try {
                await fetch(`<your url here>/${NFT.token_uri}`)
                .then(response => response.json())
                .then(data => {
                  NFT.image = resolveLink(data.image);
                });
              } catch (error) {
                setFetchSuccess(false);
              }

 */
                    }
                }
            }
            setNFTTokenIds(NFTs);
        }
    });

    return {
        getNFTTokenIds,
        NFTTokenIds,
        totalNFTs,
        fetchSuccess,
        error,
        isLoading,
    };
};