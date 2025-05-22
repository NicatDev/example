import { Col, Row, Tabs, Form } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import InsertDrawer from "@/components/ui/InsertDrawer.jsx";
import { DynamicTable as DyamicTableTemplate } from "@mtte/dynmic";
import API from "../../../api";
import FormRenderer from "../formRenderer/index";
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

      const response = await API.LabCrusherTest.create({
        ...values,
        receipt_result_date: modifiedDate,
      });
      setTabItemIdHash(response?.data?.id_hash)
      form.resetFields();
      setIsRefresh(true);
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
      label: t("DestructiveTests.headerContent.title"),
      key: "form",
      disabled: activeTab == "result",
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
      disabled: activeTab == "form",
      children: (
        <DyamicTableTemplate
          API={API.DynamicCommon}
          TableIdHash="w7$erVcbzH_pw6QtBRPQQw=="
          title={t("modulePages.DestructiveTest")}
          TabItemIdHash={tabItemIdHash}
          key={tabItemIdHash}
        />
      ),
    },
  ];

  return (
    <InsertDrawer
      title={t("DestructiveTests.headerContent.addTitle")}
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
