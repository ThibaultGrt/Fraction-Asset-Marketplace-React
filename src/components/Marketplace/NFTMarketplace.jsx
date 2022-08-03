import React, { useState, useEffect } from "react";
import { getCollectionsByChain } from "helpers/collections";
import {
  useMoralis,
  useMoralisQuery,
  useNewMoralisObject,
} from "react-moralis";
import { Card, Image, Tooltip, Modal, Badge, Alert, Spin } from "antd";
import { useNFTTokenIds } from "hooks/useNFTTokenIds";
import {
  FileSearchOutlined,
  RightCircleOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
import { useWeb3ExecuteFunction } from "react-moralis";
import CollectionCard from "../CollectionCard";

import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import FractionAssetCard from "../FractionAssetCard";
import MARKETPLACE_STATE from "./marketplace";
const { Meta } = Card;

const styles = {
  NFTs: {
    display: "flex",
    flexWrap: "wrap",
    WebkitBoxPack: "start",
    justifyContent: "flex-start",
    margin: "0 auto",
    maxWidth: "1000px",
    gap: "10px",
  },
  banner: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    margin: "0 auto",
    width: "600px",
    //borderRadius: "10px",
    height: "150px",
    marginBottom: "40px",
    paddingBottom: "20px",
    borderBottom: "solid 1px #e3e3e3",
  },
  logo: {
    height: "115px",
    width: "115px",
    borderRadius: "50%",
    // positon: "relative",
    // marginTop: "-80px",
    border: "solid 4px white",
  },
  text: {
    color: "#041836",
    fontSize: "27px",
    fontWeight: "bold",
  },
};

function NFTMarketplace({ marketplaceState, inputValue, setInputValue }) {
  const { NFTMarketplaceCollection, totalNFTs, fetchSuccess } =
    useNFTTokenIds(inputValue); // use Moralis to the details from moralis API.

  const contractProcessor = useWeb3ExecuteFunction();
  const { chainId, marketAddress, contractABI, walletAddress } =
    useMoralisDapp();
  const { Moralis } = useMoralis();
  const queryMarketItems = useMoralisQuery("MarketItems");
  const fetchMarketItems = JSON.parse(
    JSON.stringify(queryMarketItems.data, [
      "objectId",
      "createdAt",
      "price",
      "nftContract",
      "itemId",
      "sold",
      "tokenId",
      "seller",
      "owner",
      "confirmed",
    ])
  );
  const NFTCollections = getCollectionsByChain(chainId);
  const contractABIJson = JSON.parse(contractABI);

  /**
   * Get nft with specific token id.
   * @param {*} nftToBuy
   * @returns
   */
  const getMarketItem = (nftToBuy) => {
    const result = fetchMarketItems?.find(
      (e) =>
        e.nftContract === nftToBuy?.token_address &&
        e.tokenId === nftToBuy?.token_id &&
        e.sold === false &&
        e.confirmed === true
    );
    return result;
  };
  const isContractSetErrorMessage = (isContractSet) => {
    if (!isContractSet) {
      return (
        <div>
          <Alert
            message="No Smart Contract Details Provided. Please deploy smart contract and provide address + ABI in the MoralisDappProvider.js file"
            type="error"
          />
          <div style={{ marginBottom: "10px" }}></div>
        </div>
      );
    }
  };

  const isAbleToFetchDataErrorMessage = (fetchSuccess) => {
    if (!fetchSuccess) {
      return (
        <div>
          <Alert
            message="Unable to fetch all NFT metadata... We are searching for a solution, please try again later!"
            type="warning"
          />
          <div style={{ marginBottom: "10px" }}></div>
        </div>
      );
    }
  };

  const setMarketDisplay = (display) => {
    marketplaceState = display;
  };

  const getInitial = (shouldRender) => {
    if (shouldRender) {
      return (
        <div>
          {NFTCollections?.map((nft, index) => (
            <div key={index}>
              <NavLink
                to={`${nft.address}`}
                onClick={setMarketDisplay.bind(MARKETPLACE_STATE.NFT_TOKENS)}
              >
                <CollectionCard
                  totalNFTs={totalNFTs}
                  NFTMarketplaceCollection={NFTCollections}
                  nft={nft}
                  index={index}
                  setInputValue={setInputValue}
                />
              </NavLink>
            </div>
          ))}
        </div>
      );
    }
  };

  const getCollection = (shouldRender) => {
    if (shouldRender) {
      return (
        <div>
          {NFTCollections?.map((nft, index) => (
            <div key={index}>
              <NavLink
                to={`${nft.address}`}
                onClick={setMarketDisplay.bind(MARKETPLACE_STATE.NFT_TOKENS)}
              >
                <CollectionCard
                  totalNFTs={totalNFTs}
                  NFTMarketplaceCollection={NFTMarketplaceCollection}
                  nft={nft}
                  index={index}
                  setInputValue={setInputValue}
                />
              </NavLink>
            </div>
          ))}
        </div>
      );
    }
  };

  const getNfts = (shouldRender) => {
    console.log("shouldRender");
    console.log(shouldRender);
    console.log("marketplaceState");
    console.log(marketplaceState);
    if (shouldRender) {
      return (
        <div>
          {NFTMarketplaceCollection.slice(0, 20).map((nft, index) => (
            <Route path={`${nft.address}`}>
              <div key={index}>
                <FractionAssetCard
                  chainId={chainId}
                  fetchMarketItems={fetchMarketItems}
                  contractProcessor={contractProcessor}
                  nft={nft}
                />
              </div>{" "}
            </Route>
          ))}
        </div>
      );
    }
  };

  return (
    <>
      <div>
        {/* error message display */}
        {isContractSetErrorMessage(contractABIJson.noContractDeployed)}
        {/* error message display */}
        {
          <>
            {isAbleToFetchDataErrorMessage(
              (marketplaceState === MARKETPLACE_STATE.INITIAL ||
                marketplaceState === MARKETPLACE_STATE.COLLECTION) &&
                totalNFTs !== undefined &&
                fetchSuccess
            )}
          </>
        }

        <div style={styles.NFTs}>
          {/* Display the marketplace with all known collections */}

          <div>
            <Router>
              {getInitial(marketplaceState === MARKETPLACE_STATE.INITIAL)}
              {getCollection(marketplaceState === MARKETPLACE_STATE.COLLECTION)}
              {getNfts(marketplaceState === MARKETPLACE_STATE.NFT_TOKENS)}
            </Router>
          </div>
        </div>
      </div>
    </>
  );
}

export default NFTMarketplace;
