import { Button, Drawer, Space } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";

export default function FormDrawer({
  isOpen,
  tab,
  close,
  children,
  title,
  handleSave,
  width = 400,
}) {
  const { t } = useTranslation();
  return (
    <Drawer
      title={title}
      width={width}
      open={isOpen}
      onClose={close}
      extra={
        tab && (
          <Space>
            <Button onClick={handleSave} type="default">
              {t("CommonContent.saveExit")}
            </Button>
            <Button onClick={close}>{t("CommonContent.close")}</Button>
          </Space>
        )
      }
    >
      {children}
    </Drawer>
  );
}
