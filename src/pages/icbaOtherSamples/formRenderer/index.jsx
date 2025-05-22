import { Row, Col, Form, Input, Select, DatePicker } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import API from "../../../api";

export default function FormRenderer({ form }) {
  const [users, setUsers] = useState([]);
  const [dynamicValues, setDynamicValues] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, dynamicRes] = await Promise.all([
          API.AppUsers.list(),
          API.DynamicCommon.getDynamicTableDropDownList(),
        ]);

        const formatForSelect = (data = []) =>
          data.map(({ display_text, value_hash }) => ({
            label: display_text,
            value: value_hash,
          }));

        setUsers(formatForSelect(usersRes?.data));
        setDynamicValues(formatForSelect(dynamicRes?.data));
      } catch (error) {
        console.error("Failed to fetch users or dynamic values:", error);
      }
    };

    fetchData();
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
          "IcbaOtherSamples.tableContent.number",
          <Input placeholder={t("CommonContent.insertData")} />
        )}
        {renderFormItem(
          "app_user_id_hash",
          "CommonContent.uploaded_user",
          <Select options={users} placeholder={t('CommonContent.select')} />
        )}
        {renderFormItem(
          "dynamic_value_id_hash",
          "IcbaOtherSamples.tableContent.test_type",
          <Select options={dynamicValues} placeholder={t('CommonContent.select')} />
        )}
        {renderFormItem(
          "receipt_result_date",
          "IcbaOtherSamples.tableContent.result_date",
          <DatePicker className="w-[100%]" placeholder="dd/mm/yyyy" />
        )}
        {renderFormItem(
          "description",
          "IcbaOtherSamples.tableContent.note",
          <Input placeholder={t("CommonContent.insertData")} />
        )}
      </Row>
    </Form>
  );
}
