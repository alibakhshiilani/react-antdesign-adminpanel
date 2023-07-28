import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import "./container.style.scss";
import SideBar from "./components/sidebar/SideBar";
import PageContainer from "./components/pageContainer/PageContainer";
import Header from "./components/header/Header";
import { ContainerTypes } from "./components/container.types";

const Container: React.FC<ContainerTypes> = (props) => {
  const { children, classNames = "", loading = false } = props;
  const [collapsed, setCollapsed] = useState(false);
  const [theme, setTheme] = useState<string | null>(
    window.localStorage.getItem("theme")
  );

  useEffect(() => {
    if (typeof theme === "string") {
      window.localStorage.setItem("theme", theme);
    }
  }, [theme]);

  const toggle = () => setCollapsed(!collapsed);

  return (
    <Layout style={{ width: "100vw", height: "100vh" }}>
      <SideBar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        setTheme={setTheme}
      />
      <Layout className="site-layout">
        <Header collapsed={collapsed} toggle={toggle} />
        <PageContainer loading={loading} classnames={classNames}>
          {children}
        </PageContainer>
      </Layout>
    </Layout>
  );
};

export default Container;
