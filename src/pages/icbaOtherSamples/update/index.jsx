import { Col, Input, Row, Form, Select, DatePicker, Tabs } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import InsertDrawer from "@/components/ui/InsertDrawer.jsx";
import { DynamicTable as DyamicTableTemplate } from "@mtte/dynmic";
import API from "../../../api";
import FormRenderer from "../formRenderer/index";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { dateFormat } from "../../../components/utils/dateFormat";
import { notify } from "../../../components/utils/notification";

dayjs.extend(utc);
dayjs.extend(timezone);

export default function Index({ isOpen, close, itemId, setIsRefresh }) {
  const [activeTab, setActiveTab] = useState("form");
  const [form] = Form.useForm();
  const { t } = useTranslation();

  const closePage = () => {
    close();
    setActiveTab("form");
  };

  const getFormData = () => {
    API.IcbaOtherSamples.getSingleUpdate({ id: itemId })
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

  const onFinish = async () => {
    try {
      const values = form.getFieldValue();
      const modifiedDate = dateFormat(values?.receipt_result_date);

      await API.IcbaOtherSamples.update(
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
      label: t("IcbaOtherSamples.headerContent.title"),
      key: "form",
      children: <FormRenderer form={form} />,
    },
    {
      label: t("CommonContent.results"),
      key: "result",
      children: (
        <DyamicTableTemplate
          API={API.DynamicCommon}
          TableIdHash="vzjf0z7UYxMIUr09C9nHZw=="
          title={t("modulePages.ICBAOtherExample")}
          TabItemIdHash={itemId}
           key={itemId}
        />
      ),
    },
  ];

  return (
    <InsertDrawer
      title={t("IcbaOtherSamples.headerContent.editTitle")}
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
