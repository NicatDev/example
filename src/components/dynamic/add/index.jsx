// React and library imports
import React, { useEffect, useState } from "react";
import {
  Modal,
  Row,
  Col,
  Form,
  Select,
  Input,
  Button,
  Checkbox,
  Radio,
} from "antd";
import { useTranslation } from "react-i18next";
import API from "@/api";

const CreateModal = ({
  open,
  setOpen,
  columnDefs,
  selectedColumn,
  setSelectedColumn,
  dynamic_table_id_hash,
  refreshTableData,
}) => {
  // ===== Hooks and State =====
  const { TextArea } = Input;
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const [selectedType, setSelectedType] = useState(null);
  const [types, setTypes] = useState([]);
  const [dynamicTables, setDynamicTables] = useState([]);
  const [releatedColumns, setReleatedColumns] = useState([]);

  const showExtraFields = selectedType === 2 || selectedType === 4;
  const showIntegrationFields = selectedType === 3;
  const showQRCodeField = selectedType === 8;

  // ===== Effects =====
  useEffect(() => {
    form.setFieldsValue({ readonly: false });
    getInit();
  }, []);

  // ===== Fetch Initial Data =====
  const getInit = async () => {
    try {
      const inputTypes = await API.Services.getInputTypes();
      const dynamicTables = await API.Services.getDynamicTableDropDownList();
      setDynamicTables(dynamicTables.data);
      setTypes(inputTypes.data);
    } catch (error) {
      console.error("Error fetching table data", error);
    }
  };

  // ===== Handlers =====
  const onFinish = () => {
    const values = form.getFieldsValue();
    const data = {
      ...values,
      dynamic_table_id_hash,
    };

    if (showExtraFields) {
      const settings = {
        number_min: values.min,
        number_max: values.max,
        color_min: values.colorMin,
        color_max: values.colorMax,
      };
      data.settings = JSON.stringify(settings);
    }

    API.Services.addColumn(data)
      .then(() => {
        refreshTableData();
        form.resetFields();
        setOpen(false);
      })
      .catch((error) => {
        console.error("Error saving column", error);
      });
  };

  const handleChangeDynamicTable = async (value) => {
    const response = await API.Services.getDynamicColumnsByTableId(value);
    setReleatedColumns(response.data);
  };

  // ===== Render =====
  return (
    <Modal
      className="w-full"
      open={open}
      onCancel={() => {
        setOpen(false);
        setSelectedColumn(null);
      }}
      title={t("Services.headerContent.createColumn")}
      footer={[
        <Button
          key="cancel"
          onClick={() => {
            setOpen(false);
            setSelectedColumn(null);
          }}
        >
          {t("Services.formContent.cancel")}
        </Button>,
        <Button key="submit" type="primary" onClick={onFinish}>
          {t("Services.formContent.submit")}
        </Button>,
      ]}
    >
      <Col span={24}>
        <Row>
          <Form form={form} className="w-full" layout="vertical" onFinish={onFinish}>
            <Row>
              <Col span={24} className="px-2">
                <Form.Item label={t("Services.formContent.title")} name="name">
                  <Input placeholder={t("CommonContent.insertData")} />
                </Form.Item>
              </Col>

              <Col span={24} className="px-2">
                <Form.Item label={t("Services.formContent.description")} name="description">
                  <TextArea placeholder={t("CommonContent.insertData")} />
                </Form.Item>
              </Col>

              <Col span={24} className="px-2">
                <Form.Item name="input_type" label={t("Services.formContent.type")}> 
                  <Radio.Group
                    disabled={selectedColumn}
                    options={types.map((type) => ({ label: type.code, value: type.id }))}
                    onChange={(e) => {
                      setSelectedType(e.target.value);
                      form.setFieldValue("type", e.target.value);
                    }}
                  />
                </Form.Item>
              </Col>

              {showExtraFields && (
                <>
                  <Col span={12} className="px-2">
                    <Form.Item name="min" label="Min">
                      <Input placeholder={t("CommonContent.insertData")} />
                    </Form.Item>
                  </Col>
                  <Col span={12} className="px-2">
                    <Form.Item name="max" label="Max">
                      <Input placeholder={t("CommonContent.insertData")} />
                    </Form.Item>
                  </Col>
                  <Col span={12} className="px-2">
                    <Form.Item name="colorMin" label="Rəng min">
                      <Select
                        placeholder={t('CommonContent.select')}
                        options={[
                          { label: <div className="w-5 h-5 rounded-full bg-green-500" title="Yaşıl" />, value: "green" },
                          { label: <div className="w-5 h-5 rounded-full bg-yellow-400 border border-gray-300" title="Sarı" />, value: "yellow" },
                          { label: <div className="w-5 h-5 rounded-full bg-red-500" title="Qırmızı" />, value: "red" },
                        ]}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12} className="px-2">
                    <Form.Item name="colorMax" label="Rəng max">
                      <Select
                        placeholder={t('CommonContent.select')}
                        options={[
                          { label: <div className="w-5 h-5 rounded-full bg-green-500" title="Yaşıl" />, value: "green" },
                          { label: <div className="w-5 h-5 rounded-full bg-yellow-400 border border-gray-300" title="Sarı" />, value: "yellow" },
                          { label: <div className="w-5 h-5 rounded-full bg-red-500" title="Qırmızı" />, value: "red" },
                        ]}
                      />
                    </Form.Item>
                  </Col>
                </>
              )}

              {showIntegrationFields && (
                <Col span={24} className="px-2">
                  <div className="font-semibold mb-2">İnteqrasiya olunacaq formalar</div>
                  <Row>
                    <Col span={24}>
                      <Form.Item name="integrationForm1">
                        <Select
                          placeholder={t("Services.formContent.choose")}
                          onChange={handleChangeDynamicTable}
                          options={dynamicTables.map((d) => ({ label: d.display_text, value: d.value_hash }))}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item name="related_column_id_hash">
                        <Select
                          placeholder={t("Services.formContent.choose")}
                          options={releatedColumns.map((d) => ({ label: d.display_text, value: d.value_hash }))}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
              )}

              {showQRCodeField && (
                <Col span={24} className="px-2">
                  <div className="font-semibold mb-2">Sütuna əsasən</div>
                  <Form.Item name="related_column_id_hash">
                    <Select
                      placeholder={t("Services.formContent.choose")}
                      options={columnDefs.map((d) => ({ label: d.headerName, value: d.field }))}
                    />
                  </Form.Item>
                </Col>
              )}

              <Col span={24} className="px-2">
                <Form.Item name="readonly" valuePropName="checked">
                  <Checkbox>{t("Services.formContent.readonly")}</Checkbox>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Row>
      </Col>
    </Modal>
  );
};

export default CreateModal;