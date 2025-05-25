import { Global, Logo } from "@/components/icons";
import { Avatar, Button, Dropdown, Popover, Typography } from "antd";
import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import LanguageContent from "@/components/ui/LanguageContent";
import Languages from "@/config/Languages";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/context/AuthContext";

export default function Header({ }) {
  const { user, logout } = useAuth();
  const { Text } = Typography;
  const { t } = useTranslation();

  const handleLanguageChange = (code) => {
    Languages.ChangeLanguage(code);
  };

  const handleLogout = () => {
    alert("Logout");
    logout();
    window.location.href = import.meta.env.VITE_HOME;
  };

  return (
    <div className="flex w-full h-[48px] px-[15px] py-2 justify-between items-center bg-[#F9F9F8] border-b border-[#F0F0F0]">
      <div className="w-[200px] pr-[15px] h-[100%] flex justify-between items-center">
        <Logo />
      </div>

      <div className="content-center">
        <div className="content-center gap-2">
          <Text>
            <Avatar style={{ backgroundColor: "#b65f3b" }}>{`${
              user ? user?.FullName?.slice(0, 1) : ""
            }`}</Avatar>
          </Text>
          <Dropdown
            menu={{
              items: [
                {
                  key: "logout",
                  label: (
                    <Button
                      style={{ alignItems: "center" }}
                      height={"30px"}
                      icon={<LogoutOutlined />}
                      type="text"
                      danger
                    >
                      {" "}
                      {t("HeaderContent.logout")}
                    </Button>
                  ),
                },
              ],
              onClick: handleLogout,
            }}
            placement="bottom"
            arrow={{
              pointAtCenter: true,
            }}
          >
            <Text className="cursor-pointer">{`${user?.FullName}`}</Text>
          </Dropdown>
        </div>

        <Popover
          className="px-3"
          trigger="click"
          placement="bottomLeft"
          content={<LanguageContent onLanguageChange={handleLanguageChange} />}
        >
          <div className="cursor-pointer" aria-label="Select Language">
            <Global />
          </div>
        </Popover>
      </div>
    </div>
  );
}
