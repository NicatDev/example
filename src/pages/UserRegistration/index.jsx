import React, { useEffect, useState } from "react";
import PageTemplate from "../../components/ui/PageTemplate";
import AddDrawer from "./add/index";
import UpdateDrawer from "./update/index";
import API from "../../api";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
dayjs.locale("az");

export default function Index() {
  const { t } = useTranslation();
  const [isRefresh, setIsRefresh] = useState(false);
  const [showAddDrawer, setShowAddDrawer] = useState(false);
  const [showUpdateDrawer, setShowUpdateDrawer] = useState({
    visible: false,
    id: null,
  });

  const clickUpdate = (record) => {
    setShowUpdateDrawer({ visible: true, id: record.id_hash });
  };

  const columns = [
    {
      title: t("UserRegistration.tableContent.username"),
      dataIndex: "username",
      key: "username",
      width: 250,
    },
    {
      title: t("UserRegistration.tableContent.birthday"),
      dataIndex: "birthday",
      key: "birthday",
      width: 250,
    },
    {
      title: t("UserRegistration.tableContent.role"),
      dataIndex: "role",
      key: "role",
      width: 250,
    },
  ];

  return (
    <>
      <PageTemplate
        title={t("UserRegistration.headerContent.title")}
        columns={columns}
        isRefresh={isRefresh}
        setIsRefresh={setIsRefresh}
        dataKey={"UserRegistration"}
        onClickAdd={() => setShowAddDrawer(true)}
        onClickUpdate={clickUpdate}
        insertButtonText={t("UserRegistration.headerContent.insertButtonText")}
        API={API.UserRegistration}
      />
      <AddDrawer
        isOpen={showAddDrawer}
        close={() => setShowAddDrawer(false)}
        setIsRefresh={setIsRefresh}
      />
      <UpdateDrawer
        itemId={showUpdateDrawer.id}
        isOpen={showUpdateDrawer.visible}
        close={() => setShowUpdateDrawer({ visible: false, id: null })}
        setIsRefresh={setIsRefresh}
      />
    </>
  );
}
