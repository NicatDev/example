import { Row, Col, Form, Input, Select, DatePicker } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import API from "../../../api";

export default function FormRenderer({ form }) {
  const [users, setUsers] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    (async () => {
      try {
        const usersRes = await API.AppUsers.list();

        setUsers(
          usersRes?.data?.map(({ display_text, value_hash }) => ({
            label: display_text,
            value: value_hash,
          })) ?? []
        );
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    })();
  }, []);

  const renderFormItem = (name, labelKey, component) => (
    <Col className="px-2" span={24}>
      <Form.Item name={name} label={t(labelKey)}>
        {component}
      </Form.Item>
    </Col>
  );
  

  return (
    <Form form={form} className="w-full" layout="vertical">
      <Row>
        {renderFormItem(
          "doc_number",
          "IcbaWaterSamples.tableContent.number",
          <Input placeholder={t("CommonContent.insertData")} />
        )}
        {renderFormItem(
          "app_user_id_hash",
          "CommonContent.uploaded_user",
          <Select options={users} placeholder={t('CommonContent.select')} />
        )}
        {renderFormItem(
          "receipt_result_date",
          "IcbaWaterSamples.tableContent.result_date",
          <DatePicker className="w-[100%]" placeholder="dd/mm/yyyy" />
        )}
        {renderFormItem(
          "description",
          "IcbaWaterSamples.tableContent.note",
          <Input placeholder={t("CommonContent.insertData")} />
        )}
      </Row>
    </Form>
  );
}
