import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Redirect,
} from "react-router-dom";
import Account from "components/Account";
import Chains from "components/Chains";
import { Menu, Layout } from "antd";

import "antd/dist/antd.css";
import NativeBalance from "components/NativeBalance";
import "./style.css";
import Text from "antd/lib/typography/Text";
import FractionAssetBalance from "components/FractionAssetBalance";
import FractionAsset from "components/FractionAsset";
import LogoImg from "./assets/logo_without_name.png";

const { Header, Footer } = Layout;

const styles = {
  content: {
    display: "flex",
    justifyContent: "center",
    fontFamily: "Roboto, sans-serif",
    color: "#041836",
    marginTop: "130px",
    padding: "10px",
  },
  header: {
    position: "fixed",
    zIndex: 1,
    width: "100%",
    background: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: "Roboto, sans-serif",
    borderBottom: "2px solid rgba(0, 0, 0, 0.06)",
    padding: "0 10px",
    boxShadow: "0 1px 10px rgb(151 164 175 / 10%)",
  },
  headerRight: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
    fontSize: "15px",
    fontWeight: "600",
  },
  logo: {
    width: "80px",
    maxWidth: "80px",
  },
};
const App = ({ isServerInfo }) => {
  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading } =
    useMoralis();

  const [inputValue, setInputValue] = useState("explore");

  useEffect(() => {
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);

  return (
    <Layout style={{ height: "100vh", overflow: "auto" }}>
      <Router>
        <Header style={styles.header}>
          <Logo />
          <Menu
            theme="light"
            mode="horizontal"
            style={{
              display: "flex",
              fontSize: "17px",
              fontWeight: "500",
              marginLeft: "50px",
              width: "100%",
            }}
            defaultSelectedKeys={["nftMarket"]}
          >
            <Menu.Item key="fa">
              <NavLink to="/faDisplay">🔥 Fraction Asset</NavLink>
            </Menu.Item>
            <Menu.Item key="faBalance">
              <NavLink to="/faBalance">🖼 Your Collection</NavLink>
            </Menu.Item>
          </Menu>
          <div style={styles.headerRight}>
            <Chains />
            <NativeBalance />
            <Account />
          </div>
        </Header>
        <div style={styles.content}>
          <Switch>
            <Route path="/faBalance">
              <FractionAssetBalance />
            </Route>
            <Route path="/faDisplay">
              <FractionAsset chainId />
            </Route>
          </Switch>
          <Redirect to="/faDisplay" />
        </div>
      </Router>
      <Footer style={{ textAlign: "center" }}>
        <Text style={{ display: "block" }}>® Fraction Asset Inc,</Text>

        <Text style={{ display: "block" }}>2022, Paris </Text>
      </Footer>
    </Layout>
  );
};

export const Logo = () => (
  <div style={{ display: "flex" }}>
    <img style={styles.logo} src={LogoImg} />
  </div>
);

export default App;
