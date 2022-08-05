import { Alert, Badge, Card, Image, Input, Modal, Spin, Tooltip } from "antd";
import React, { useState, useEffect } from "react";
import fractionAssetContractJSON from "../contracts/FractionAsset.sol/FractionAsset.json";
import { BigNumber, ethers } from "ethers";
import { FileSearchOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import Meta from "antd/lib/card/Meta";
import { getExplorer } from "helpers/networks";

import LogoImg from "../assets/logo_without_name.png";

export default function FractionAsset(props) {
  const contractAddr = "0x508aDCE0061B5F5FeBE092e993204cA0017B927A";
  const fallbackImg = LogoImg;

  const [provider, setProvider] = useState();
  const [assetToBuy, setAssetToBuy] = useState(null);
  const [visibility, setVisibility] = useState(false);
  const [signer, setSigner] = useState();
  const [fractionAssetContract, setfractionAssetContract] = useState(null);
  const chainId = "0x13881";
  const [asset, setAsset] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const fractionAssetABI = fractionAssetContractJSON.abi;
  const [loading, setLoading] = useState(false);
  const [fractionsToBuy, setFractionsToBuy] = useState("");

  useEffect(() => {
    // get provider
    (async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      const accounts = await provider.send("eth_requestAccounts", []);
      setProvider(provider);
      setAccounts(accounts);
      console.log("accounts");
      console.log(accounts);
      const signer = await provider.getSigner(0);
      setSigner(signer);
      console.log("signer");
      console.log(signer);
      const contract = new ethers.Contract(
        contractAddr,
        fractionAssetABI,
        provider
      );

      console.log("contract");
      console.log(contract);
      // set the contract
      setfractionAssetContract(contract);

      const asset = {
        name: await contract.name(),
        image: fallbackImg,
        shares: await contract.shares(),
        price: await contract.sharePrice(),
      };

      setAsset(asset);
    })();
  }, []);

  const getSharesBalance = (addr) => {
    return fractionAssetContract.balanceOf(addr);
  };

  const buyShares = async (amount) => {
    setAsset(asset);
    setLoading(true);
    console.log("ethers.utils.parseEther(amount * asset.price)");
    console.log(amount);
    console.log(asset.price);
    console.log(String(amount * asset.price));
    console.log(ethers.utils.parseEther(String(amount * asset.price)));

    const succ = await fractionAssetContract
      .connect(signer)
      .buyFractions(amount, {
        value: BigNumber.from(String(amount * asset.price)),
        gasLimit: "100000",
      });
    setLoading(false);
    setVisibility(false);
  };

  const handleBuyClick = (asset) => {
    setAssetToBuy(asset);

    setVisibility(true);
  };
  const handleInput = (event) => {
    setFractionsToBuy(event.target.value);
  };

  return (
    <div>
      <Card
        hoverable
        actions={[
          <Tooltip title="View On Blockexplorer">
            <FileSearchOutlined
              onClick={() =>
                window.open(
                  `${getExplorer(chainId)}address/${contractAddr}`,
                  "_blank"
                )
              }
            />
          </Tooltip>,
          <Tooltip title="Buy Asset Fractions">
            <ShoppingCartOutlined onClick={() => handleBuyClick(asset)} />
          </Tooltip>,
        ]}
        style={{ width: 240, border: "2px solid #e7eaf3" }}
        cover={
          <Image
            preview={false}
            src={asset?.image || "error"}
            fallback={fallbackImg}
            alt=""
            style={{ height: "240px" }}
          />
        }
      >
        {asset && <Badge.Ribbon text="Buy Now" color="green"></Badge.Ribbon>}
        <Meta
          title={asset?.name}
          description={`Total Number of shares: #${asset?.shares}`}
        />
      </Card>
      <div>
        <Modal
          title={`Buy ${assetToBuy?.name} #${assetToBuy?.shares}`}
          visible={visibility}
          onCancel={() => setVisibility(false)}
          onOk={() => buyShares(fractionsToBuy)}
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
                text={`${assetToBuy?.price / ("1e" + 18)} Matic`}
              >
                <img
                  src={assetToBuy?.image}
                  style={{
                    width: "250px",
                    borderRadius: "10px",
                    marginBottom: "15px",
                  }}
                />
                <Input
                  onChange={handleInput}
                  placeholder={`# of shares max ${fractionAssetContract?.shares()}`}
                ></Input>
              </Badge.Ribbon>
            </div>
          </Spin>
        </Modal>

        {/* <Modal
            title={`Buy ${assetToBuy?.name} #${assetToBuy?.token_id}`}
            visible={visibility}
            onCancel={() => setVisibility(false)}
            onOk={() => setVisibility(false)}
          >
            <img
              src={assetToBuy?.image}
              style={{
                width: "250px",
                margin: "auto",
                borderRadius: "10px",
                marginBottom: "15px",
              }}
            />
            <Alert message="This NFT is currently not for sale" type="warning" />
          </Modal> */}
      </div>
    </div>
  );
}
