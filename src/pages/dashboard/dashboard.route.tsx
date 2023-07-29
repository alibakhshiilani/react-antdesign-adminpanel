import { DashboardOutlined } from "@ant-design/icons";
import Dashboard from "./Dashboard";
import { ContainerRoute } from "../../routes/containerRoutes.types";

export const DashboardPathNames = {
  dashboard: "/",
};

export const DashboardRoutes: ContainerRoute[] = [
  {
    title: "داشبورد",
    path: DashboardPathNames.dashboard,
    component: Dashboard,
    exact: true,
    icon: <DashboardOutlined />,
  },
];
