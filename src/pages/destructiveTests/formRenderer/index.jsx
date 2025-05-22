import { Row, Col, Form, Input, Select, DatePicker } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import API from "../../../api";

export default function FormRenderer({ form }) {
  const { t } = useTranslation();
  const [analysisParameters, setAnalysisParameters] = useState([]);

  const getAnalysisParameters = () => {
    API.LabAnalysisParameter.get().then((res) => {
      const { data } = res;
      const modified_data =
        data?.length > 0
          ? [...data]?.map((d) => {
              return {
                value: d?.value_hash,
                label: d?.display_text,
              };
            })
          : [];

      setAnalysisParameters([...modified_data]);
    });
  };

  useEffect(() => {
    getAnalysisParameters();
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
          "DestructiveTests.tableContent.number",
          <Input placeholder={t("CommonContent.insertData")} />
        )}

        {renderFormItem(
          "receipt_result_date",
          "DestructiveTests.tableContent.date",
          <DatePicker className="w-[100%]" placeholder="dd/mm/yyyy" />
        )}

        {renderFormItem(
          "work_shift",
          "DestructiveTests.tableContent.work_shift",
          <Select
            options={[
              {
                label: t("CommonContent.night"),
                value: 1,
              },
              {
                label: t("CommonContent.day"),
                value: 2,
              },
            ]}
            placeholder={t('CommonContent.select')}
          />
        )}

        {renderFormItem(
          "analysis_parameter_id_hash",
          "DestructiveTests.tableContent.analysisParameter",
          <Select options={analysisParameters} placeholder={t('CommonContent.select')} />
        )}

        {renderFormItem(
          "result",
          "DestructiveTests.tableContent.result",
          <Input placeholder={t("CommonContent.insertData")} />
        )}

        {renderFormItem(
          "description",
          "DestructiveTests.tableContent.note",
          <Input placeholder={t("CommonContent.insertData")} />
        )}
      </Row>
    </Form>
  );
}
