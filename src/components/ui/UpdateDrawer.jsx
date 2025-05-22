import { Button, Drawer, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function UpdateDrawer({
  isOpen,
  close,
  children,
  title,
  handleSave,
  handleSaveContinue,
  width = 400,
}) {
  const { t } = useTranslation();

  useEffect(() => {}, [isOpen]);

  return (
    <Drawer
      title={title}
      width={width}
      open={isOpen}
      onClose={close}
      extra={
        <Space>
          <Button onClick={handleSave} type="primary">
            {t("CommonContent.save")}
          </Button>
          {handleSaveContinue && (
            <Button onClick={handleSaveContinue} type="text">
              {t("CommonContent.saveContinue")}
            </Button>
          )}
          <Button onClick={close}>{t("CommonContent.close")}</Button>
        </Space>
      }
    >
      {children}
    </Drawer>
  );
}
