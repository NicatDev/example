import { Row, Col, Form, Input, Select, DatePicker } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";


export default function FormRenderer({ form }) {
  const [dropdownData, setDropdownData] = useState([]); 
  // Selectbox-da istifade ucun Dropdown list datasina ehtiyac varsa set edin...

  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      //Selectbox-da istifade ucun Dropdown list datasina ehtiyac varsa fetch edin...
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
          "username",
          "UserRegistration.tableContent.username",
          <Input placeholder={t("CommonContent.insertData")} />
        )}
        {renderFormItem(
          "role",
          "UserRegistration.tableContent.role",
          <Select options={dropdownData} placeholder={t('CommonContent.select')} />
        )}
        {renderFormItem(
          "birthday",
          "UserRegistration.tableContent.birthday",
          <DatePicker className="w-[100%]" placeholder="dd/mm/yyyy" />
        )}
      </Row>
    </Form>
  );
}
