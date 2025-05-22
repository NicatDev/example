import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ConfigProvider, Layout, Menu } from "antd";
import {  ReadOutlined, ExperimentOutlined , AppstoreOutlined } from "@ant-design/icons";
import {
  ModuleIcbaOther,
  ModulesIcbaWater,
  ModulesDestructiveTests,
  ModulesMiningGeoSamples,
  ModulesStatistics,
  ModulesExplorationSamples,
} from "@/components/icons";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/context/AuthContext";

export default function Sidebar({ collapsed }) {
  const [selectedMenuKey, setSelectedMenuKey] = useState(null);
  const { t } = useTranslation();
  const { Sider } = Layout;
  const [menuItems, setMenuItems] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const { userModules } = useAuth();

  const handleSelectMenuItem = (e) => {
    const menuKey = e?.key;
    navigate(`${menuKey}`);
    setSelectedMenuKey(menuKey);
  };

  const icons = {
      DestructiveTestIcon: <ModulesDestructiveTests />,
      MiningGeologyExampleIcon: <ModulesMiningGeoSamples />,
      ICBAWaterExampleIcon: <ModulesIcbaWater/>,
      ICBAOtherExampleIcon: <ModuleIcbaOther/>,
      StatisticIcon: <ModulesStatistics />,
      ResearchTypeIcon: <ReadOutlined />,
      ExperimentTypeIcon: <ExperimentOutlined />,
      ExplorationTypeIcon: <ModulesExplorationSamples />,
  };

  useEffect(() => {
    const convertedMenuItems = userModules?.map((item) => ({
      label: t(item.name),
      key: item.key,
      icon: icons[item.icon],
    }));
    setMenuItems([
      {
        label: t("CommonContent.returnModules"),
        key: "home",
        icon: <AppstoreOutlined />,
      },
      ...convertedMenuItems,
    ]);

    const path = location.pathname.split("/");
    setSelectedMenuKey(`${path[1]}`);
  }, []);

  return (
    <Sider collapsed={collapsed} width={215} collapsedWidth={55} theme="light">
      <ConfigProvider
        theme={{
          components: {
            Menu: {
              itemMarginInline: 0,
              itemSelectedColor: "#b65f3b",
              itemHeight: 34,
            },
          },
        }}
      >
        <Menu
          mode="inline"
          className="sidebar_menu"
          items={menuItems}
          onSelect={(e) => {
            if (e.key === "home") {
              window.location.href = import.meta.env.VITE_HOME;
            } else {
              handleSelectMenuItem(e);
            }
          }}
          selectedKeys={selectedMenuKey}
        />
      </ConfigProvider>
    </Sider>
  );
}
