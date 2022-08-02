import React, { useState } from "react";
import { Button, Form, Input, InputNumber, Select } from "antd";
import { ethers } from "ethers";

export default function FractionAssetForm() {
  // usetstate for storing and retrieving wallet details
  const [data, setData] = useState({
    address: "",
    Balance: null,
  });
  // let provider;

  // const url =
  //   "https://eth-goerli.g.alchemy.com/v2/I0uldqMQG8YFr5cNCj6GbEzP0ym3VuEx";
  // const ALCHEMY_API_KEY = "5Uw5kDlJT4Y25NEfvFylp1m87wSV5K-h";

  const deploySmartContract = async (e) => {
    //   console.log(e);
    //   // Asking if metamask is already present or not
    //   if (window.ethereum) {
    //     provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    //     await provider.send("eth_requestAccounts", []);
    //     const signer = provider.getSigner();
    //     console.log("signer");
    //     const signAddr = await signer.getAddress();
    //     console.log(await signer.getAddress());
    //     const tx = await prepareContractDeployment(provider, signAddr);
    //     console.log("tx");
    //     console.log(tx);
    //     const signedTx = await provider.signTran(tx);
    //     const receipt = await provider.sendTransaction(tx);
    //     console.log(receipt);
    //     // res[0] for fetching a first wallet
    //     let res = await window.ethereum.request({
    //       method: "eth_requestAccounts", //eth_sendTransaction
    //     });
    //     console.log(res[0]);
    //     accountChangeHandler(res[0]);
    //     console.log(data);
    //   } else {
    //     alert("install metamask extension!!");
    //   }
  };
  // const buildTransaction = async () => {
  //   //const nonce = await web3.eth.getTransactionCount(myAddress, "latest"); // nonce starts counting from 0
  //   const transaction = {
  //     to: "0x31B98D14007bDEe637298086988A0bBd31184523", // faucet address to return eth
  //     value: 100,
  //     gas: 30000,
  //     maxPriorityFeePerGas: 1000000108,
  //     //nonce: nonce,
  //     // optional data field to send message or execute smart contract
  //   };
  //   // res[0] for fetching a first wallet
  //   let res = await window.ethereum.request({
  //     method: "eth_sendTransaction",
  //   });
  // };
  // const prepareContractDeployment = async (provider, signerAddr) => {
  //   const tx = {
  //     //   from: signerAddr,
  //     to: "0x3ea38A0847aA35DfA1B5C1316837d49Afac65e0E",
  //     value: ethers.utils.parseEther("5"),
  //     //   nonce: await provider.getTransactionCount(signerAddr, "latest"),
  //     //   gasLimit: ethers.utils.hexlify(21000),
  //     //   gasPrice: await provider.getGasPrice(),
  //   };
  //   return tx;
  // };
  // // Function for getting handling all events
  // const accountChangeHandler = (account) => {
  //   // Setting an address data
  //   setData({
  //     address: account,
  //   });
  // };

  return (
    <div>
      <h1> Create you Fraction Asset</h1>
      <p className=""></p>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        onFinish={deploySmartContract}
      >
        <Form.Item label="Name">
          <Input />
        </Form.Item>
        <Form.Item label="Price Ξ:">
          <InputNumber />
        </Form.Item>
        <Form.Item label="# of Shares">
          <InputNumber />
        </Form.Item>
        <Form.Item>
          <Select>
            <Select.Option value="localhost">Localhost</Select.Option>
            <Select.Option disabled="true" value="mumbai">
              Mumbai
            </Select.Option>
            <Select.Option disabled="true" value="goerli">
              Goerli
            </Select.Option>
            <Select.Option disabled="true" value="ethMain">
              Ethereum Mainnet
            </Select.Option>
            <Select.Option disabled="true" value="polyMain">
              Polygon Mainnet
            </Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Select>
            <Select.Option value="FA">Fraction Asset</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
