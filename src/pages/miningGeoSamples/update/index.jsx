import { Form, Tabs } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import UpdateDrawer from "@/components/ui/UpdateDrawer.jsx";
import { DynamicTable as DyamicTableTemplate } from "@mtte/dynmic";
import API from "../../../api";
import FormRenderer from "../formRenderer/index";
import { notify } from "../../../components/utils/notification";
import InsertDrawer from "../../../components/ui/InsertDrawer";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { dateFormat } from "../../../components/utils/dateFormat";

dayjs.extend(utc);
dayjs.extend(timezone);

export default function Index({ isOpen, close, itemId, setIsRefresh }) {
  const [activeTab, setActiveTab] = useState("form");
  const [form] = Form.useForm();
  const { t } = useTranslation();

  const getFormData = () => {
    API.MiningGeoSamples.getSingleUpdate({ id: itemId })
      .then((response) => {
        const { data } = response;
        data.receipt_result_date = data?.receipt_result_date
          ? dayjs(data.receipt_result_date)
          : null;
        form.setFieldsValue(data);
      })
      .catch((error) => {
        console.error("Error fetching table data", error);
      });
  };

  useEffect(() => {
    if (itemId) getFormData();
  }, [itemId]);

  const closePage = () => {
    close();
    setActiveTab("form");
  };

  const onFinish = async () => {
    try {
      const values = form.getFieldValue();
      const modifiedDate = dateFormat(values?.receipt_result_date);

      await API.MiningGeoSamples.update(
        {
          ...values,
          receipt_result_date: modifiedDate,
        },
        itemId
      );
      form.resetFields();
      setIsRefresh(true);
      notify.success({ message: t("CommonContent.successUpdate") });
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
      children: <FormRenderer form={form} />,
    },
    {
      label: t("CommonContent.results"),
      key: "result",
      children: (
        <DyamicTableTemplate
          API={API.DynamicCommon}
          TableIdHash="ocEt42gC8M5oG5DyMafoaw=="
          title={t("modulePages.MiningGeologyExample")}
        />
      ),
    },
  ];

  return (
    <InsertDrawer
      title={t("MiningGeoSamples.headerContent.editTitle")}
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
