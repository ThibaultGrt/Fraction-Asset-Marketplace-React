import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { MoralisProvider } from "react-moralis";
import "./index.css";
import { MoralisDappProvider } from "./providers/MoralisDappProvider/MoralisDappProvider";

/** Get your free Moralis Account https://moralis.io/ */

const APP_ID = "SQAq0R4Kg0hb0fKUpldeqqSkecKXnKIx5UQ65D1R";
const SERVER_URL = "https://4y8ugmzt2b0m.usemoralis.com:2053/server";

const Application = () => {
  const isServerInfo = APP_ID && SERVER_URL ? true : false;
  console.log("isServerInfo");
  console.log(isServerInfo);
  if (isServerInfo)
    return (
      <MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
        <MoralisDappProvider>
          <App isServerInfo />
        </MoralisDappProvider>{" "}
      </MoralisProvider>
    );
};

ReactDOM.render(
  // <React.StrictMode>
  <Application />,
  // </React.StrictMode>,
  document.getElementById("root")
);
