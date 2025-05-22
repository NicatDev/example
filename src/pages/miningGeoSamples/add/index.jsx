import { Col, Input, Row, Form, Select, DatePicker, Tabs } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import InsertDrawer from "@/components/ui/InsertDrawer.jsx";
import { DynamicTable as DyamicTableTemplate } from "@mtte/dynmic";
import API from "../../../api";
import FormRenderer from "../formRenderer/index";
import { notify } from "../../../components/utils/notification";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { dateFormat } from "../../../components/utils/dateFormat";

dayjs.extend(utc);
dayjs.extend(timezone);

export default function Index({ isOpen, close, setIsRefresh }) {
  const [activeTab, setActiveTab] = useState("form");
  const [tabItemIdHash, setTabItemIdHash] = useState(null);
  
  const [form] = Form.useForm();
  const { t } = useTranslation();

  const closePage = () => {
    close();
    setActiveTab("form");
  };

  const onFinish = async () => {
    try {
      const values = form.getFieldValue();
      const modifiedDate = dateFormat(values?.receipt_result_date);

      const response = await API.MiningGeoSamples.create({
        ...values,
        receipt_result_date: modifiedDate,
      });
      setTabItemIdHash(response?.data?.id_hash);
      form.resetFields();
      setIsRefresh(true);
      notify.success({ message: t("CommonContent.successCreate") });
      return true;
    } catch (error) {
      console.error("Error fetching table data", error);
      return false;
    }
  };

  const finishAndExit = async () => {
    const success = await onFinish();
    if (success) closePage();
  };

  const finishAndContinue = async () => {
    const success = await onFinish();
    if (success) setActiveTab("result");
  };

  const tabItems = [
    {
      label: t("MiningGeoSamples.headerContent.title"),
      key: "form",
      disabled: activeTab == "result",
      children: <FormRenderer form={form} />,
    },
    {
      label: t("CommonContent.results"),
      key: "result",
      disabled: activeTab == "form",
      children: (
        <DyamicTableTemplate
          API={API.DynamicCommon}
          TableIdHash="ocEt42gC8M5oG5DyMafoaw=="
          title={t("modulePages.MiningGeologyExample")}
          TabItemIdHash={tabItemIdHash}
          key={tabItemIdHash}
        />
      ),
    },
  ];

  return (
    <InsertDrawer
      title={t("MiningGeoSamples.headerContent.addTitle")}
      close={closePage}
      isOpen={isOpen}
      width={activeTab === "form" ? 830 : "100vw"}
      handleSave={finishAndExit}
      handleSaveContinue={finishAndContinue}
      tab={activeTab != "result"}
    >
      <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} />
    </InsertDrawer>
  );
}
