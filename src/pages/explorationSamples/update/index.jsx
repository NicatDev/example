import { Col, Row, Tabs, Form } from "antd";
import { useEffect, useState } from "react";
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

export default function Index({ isOpen, close, itemId, setIsRefresh }) {
  const [activeTab, setActiveTab] = useState("form");
  const [form] = Form.useForm();
  const { t } = useTranslation();

  const closePage = () => {
    close();
    setActiveTab("form");
  };

  const getFormData = () => {
    API.ExplorationSamples.getSingleUpdate({ id: itemId })
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
      await API.ExplorationSamples.update({
        ...values,
        receipt_result_date: modifiedDate,
      });
      form.resetFields();
      setIsRefresh(true);
      notify.success({ message: t("CommonContent.successUpdate") });
      return true;
    } catch (error) {
      console.error("Error submitting form", error);
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
      label: t("ExplorationSamples.headerContent.title"),
      key: "form",
      children: (
        <Row className="w-full">
          <Col span={24}>
            <Form form={form} layout="vertical" onFinish={onFinish}>
              <FormRenderer form={form} />
            </Form>
          </Col>
        </Row>
      ),
    },
    {
      label: t("CommonContent.results"),
      key: "result",
      children: (
        <DyamicTableTemplate
          API={API.DynamicCommon}
          TableIdHash="GcXmwDGGaO3XSXd_6vxFBw=="
          title={t("modulePages.ExplorationType")}
          TabItemIdHash={itemId}
          key={itemId}
        />
      ),
    },
  ];

  return (
    <InsertDrawer
      title={t("ExplorationSamples.headerContent.editTitle")}
      close={closePage}
      isOpen={isOpen}
      width={activeTab === "form" ? 830 : "100vw"}
      handleSave={finishAndExit}
      handleSaveContinue={finishAndContinue}
      tab={activeTab !== "result"}
    >
      <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} />
    </InsertDrawer>
  );
}
