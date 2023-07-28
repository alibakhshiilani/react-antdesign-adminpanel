import "../../container.style.scss";
import React from "react";
import { Layout, Spin } from "antd";
import Bread from "../breadcrumb/Breadcrumb";
import { adminRoutes } from "../../../../routes/router";
import { PageContainerTypes } from "./pageContainer.types";

const { Content } = Layout;

const PageContainer: React.FC<PageContainerTypes> = (props) => {
  const { loading = false, classnames = "", children } = props;
  return (
    <Layout
      // {...props}
      id="page-container"
      style={{ backgroundColor: "#f0f2f5" }}
    >
      <Content>
        <Spin spinning={loading}>
          <div
            className={`page-container-content ${classnames}`}
            style={{
              background: "#314150",
              backgroundColor: "#fff",
            }}
          >
            <Bread routeList={adminRoutes} />
            <div>{children && children}</div>
          </div>
        </Spin>
      </Content>
    </Layout>
  );
};

export default PageContainer;
