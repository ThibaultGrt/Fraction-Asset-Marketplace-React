import { Alert, Badge, Modal, Spin } from "antd";
import React from "react";

export default function AssetCardModalError({
  nftToBuy,
  visibility,
  setVisibility,
}) {
  return (
    <div>
      <Modal
        title={`Buy ${nftToBuy?.name} #${nftToBuy?.token_id}`}
        visible={visibility}
        onCancel={() => setVisibility(false)}
        onOk={() => setVisibility(false)}
      >
        <img
          src={nftToBuy?.image}
          style={{
            width: "250px",
            margin: "auto",
            borderRadius: "10px",
            marginBottom: "15px",
          }}
        />
        <Alert message="This NFT is currently not for sale" type="warning" />
      </Modal>
    </div>
  );
}
