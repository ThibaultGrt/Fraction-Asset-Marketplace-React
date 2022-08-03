import { Badge, Modal, Spin } from "antd";
import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { getNativeByChain } from "helpers/networks";
import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";

import React from "react";

export default function AssetCardModal({
  fetchMarketItems,
  nftToBuy,
  contractProcessor,
  visibility,
  setVisibility,
}) {
  const { chainId, marketAddress, contractABI, walletAddress } =
    useMoralisDapp();
  const [loading, setLoading] = useState(false);
  const { Moralis } = useMoralis();
  const nativeName = getNativeByChain(chainId);
  const purchaseItemFunction = "createMarketSale";
  const contractABIJson = JSON.parse(contractABI);
  /**
   * Get nft with specific token id.
   * @param {*} nft
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
  async function updateSoldMarketItem() {
    const id = getMarketItem(nftToBuy).objectId;
    const marketList = Moralis.Object.extend("MarketItems");
    const query = new Moralis.Query(marketList);
    await query.get(id).then((obj) => {
      obj.set("sold", true);
      obj.set("owner", walletAddress);
      obj.save();
    });
  }

  function succPurchase() {
    let secondsToGo = 5;
    const modal = Modal.success({
      title: "Success!",
      content: `You have purchased this NFT`,
    });
    setTimeout(() => {
      modal.destroy();
    }, secondsToGo * 1000);
  }

  function failPurchase() {
    let secondsToGo = 5;
    const modal = Modal.error({
      title: "Error!",
      content: `There was a problem when purchasing this NFT`,
    });
    setTimeout(() => {
      modal.destroy();
    }, secondsToGo * 1000);
  }

  async function purchase() {
    setLoading(true);
    const tokenDetails = nftToBuy;
    const itemID = tokenDetails.itemId;
    const tokenPrice = tokenDetails.price;

    const ops = {
      contractAddress: marketAddress,
      functionName: purchaseItemFunction,
      abi: contractABIJson,
      params: {
        nftContract: nftToBuy.token_address,
        itemId: itemID,
      },
      msgValue: tokenPrice,
    };
    await contractProcessor.fetch({
      params: ops,
      onSuccess: () => {
        console.log("success");
        setLoading(false);
        setVisibility(false);
        updateSoldMarketItem();
        succPurchase();
      },
      onError: (error) => {
        setLoading(false);
        failPurchase();
      },
    });
  }
  return (
    <div>
      <Modal
        title={`Buy ${nftToBuy?.name} #${nftToBuy?.token_id}`}
        visible={visibility}
        onCancel={() => setVisibility(false)}
        onOk={() => purchase()}
        okText="Buy"
      >
        <Spin spinning={loading}>
          <div
            style={{
              width: "250px",
              margin: "auto",
            }}
          >
            <Badge.Ribbon
              color="green"
              text={`${
                getMarketItem(nftToBuy).price / ("1e" + 18)
              } ${nativeName}`}
            >
              <img
                src={nftToBuy?.image}
                style={{
                  width: "250px",
                  borderRadius: "10px",
                  marginBottom: "15px",
                }}
              />
            </Badge.Ribbon>
          </div>
        </Spin>
      </Modal>
    </div>
  );
}
