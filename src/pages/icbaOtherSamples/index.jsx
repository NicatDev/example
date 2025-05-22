import React, { useEffect, useState } from "react";
import PageTemplate from "../../components/ui/PageTemplate";
import AddDrawer from "./add/index";
import UpdateDrawer from "./update/index";
import API from "../../api";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
dayjs.locale("az");

export default function Index({permission}) {
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
      title: t("IcbaOtherSamples.tableContent.number"),
      dataIndex: "doc_number",
      key: "doc_number",
      width: 250,
    },
    {
      title: t("CommonContent.uploaded_user"),
      dataIndex: "app_user",
      key: "app_user",
      width: 250,
    },
    {
      title: t("IcbaWaterSamples.tableContent.result_date"),
      dataIndex: "receipt_result_date",
      key: "receipt_result_date",
      width: 250,
      render: (record) =>
        `${record ? dayjs(record).format("YYYY-MM-DD HH:mm:ss") : ""}`,
    },
    {
      title: t("IcbaOtherSamples.tableContent.test_type"),
      dataIndex: "dynamic_value",
      key: "dynamic_value",
      width: 250,
    },
    {
      title: t("IcbaOtherSamples.tableContent.note"),
      dataIndex: "description",
      key: "description",
      width: 250,
    },
    {
      title: t("CommonContent.inserted_user"),
      dataIndex: "inserted_user",
      key: "inserted_user",
      width: 250,
    },
    {
      title: t("CommonContent.inserted_date"),
      dataIndex: "inserted_date",
      key: "inserted_date",
      width: 250,
      render: (record) =>
        `${record ? dayjs(record).format("YYYY-MM-DD HH:mm:ss") : ""}`,
    },
    {
      title: t("CommonContent.modified_user"),
      dataIndex: "modified_user",
      key: "modified_user",
      width: 250,
    },
    {
      title: t("CommonContent.modified_date"),
      dataIndex: "modified_date",
      key: "modified_date",
      width: 250,
      render: (record) =>
        `${record ? dayjs(record).format("YYYY-MM-DD HH:mm:ss") : ""}`,
    },
    {
      title: t("IcbaOtherSamples.tableContent.status"),
      dataIndex: "is_deleted",
      key: "is_deleted",
      width: 150,
      fixed: "right",
      render: (text, record) => (
        <div className="flex flex-row items-center">
          <div
            className={`w-2 h-2 ${
              !text? "bg-[#52C41A]" : "bg-[#FF4D4F]"
            }  rounded-full mr-2`}
          />
          <span>{t(`CommonContent.${!text?'active':'deactive'}`)}</span>
        </div>
      ),
    },
  ];



  return (
    <>
      <PageTemplate isDeleted={true}
        title={t("IcbaOtherSamples.headerContent.title")}
        columns={columns}
        isRefresh={isRefresh}
        setIsRefresh={setIsRefresh}
        dataKey={"id_hash"}
        onClickAdd={() => setShowAddDrawer(true)}
        onClickUpdate={clickUpdate}
        insertButtonText={t("IcbaOtherSamples.headerContent.insertButtonText")}
         API={API.IcbaOtherSamples}
         permission={permission}
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
