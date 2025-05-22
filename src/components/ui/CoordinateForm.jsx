import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import * as XLSX from "xlsx";
import {
  Col,
  Input,
  List,
  Row,
  Typography,
  Upload,
  Grid,
  Button,
  Select,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import API from "../../api";
const { Text } = Typography;
const { useBreakpoint } = Grid;

const Index = ({ coordinatesList, setCoordinatesList }) => {
  const {t} = useTranslation()
  const [utmOptions, setUtmOptions] = useState([]);
  const [uploadExcel, setUploadExcel] = useState();

  const getUtmOptions = () => {
    API.Utm.getDropdownList()
      .then((res) => {
        const modified_data = res?.data?.map(d => {
          return {
            value: d?.value_hash,
            label: d.display_text
          }
        })
        setUtmOptions(prevState => [...modified_data]);
      })
      .catch((error) => {
        console.error("Error fetching table data", error);
      });
  };

  useEffect(() => {
    getUtmOptions()
  }, []);

  useEffect(() => {
    if(uploadExcel)handleAddNewInputListFromExcel();
  }, [uploadExcel]);

  const convertExcelToJson = async (file) => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: "array" });

      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      const resultArray = jsonData.map((row) => {
        const obj = {};
        for (let i = 0; i < jsonData[0].length; i++) {
          obj[jsonData[0][i]] = row[i];
        }
        return obj;
      });
      return resultArray.slice(1);
    } catch (error) {
      console.error("Error converting Excel to JSON:", error);
      throw error;
    }
  };

  const handleAddNewInputListToForm = () => {
    const newUuid = uuidv4();
    if (coordinatesList?.length < 10) {
      setCoordinatesList([
        ...coordinatesList,
        {
          key: `${newUuid}`,
          utm: undefined,
          border_point: undefined,

          coordinate_x: undefined,
          coordinate_y: undefined,
          coordinate_z: undefined,
        },
      ]);
    }
  };

  const handleAddNewInputListFromExcel = async () => {
    const data = await convertExcelToJson(uploadExcel);

    const newcoordinatesList = data.map((row, index) => {
      const uuid = uuidv4();
      return {
        key: uuid,
        utm: undefined,
        border_point: row.border_point || undefined,
        coordinate_x: row.coordinate_x || undefined,
        coordinate_y: row.coordinate_y || undefined,
        coordinate_z: row.coordinate_z || undefined,
      };
    });

    setCoordinatesList((prevList) => [...prevList, ...newcoordinatesList]);
  };

  const getZoneList = () => {
    // //console.log("zoneList");
  };

  const handleDeleteInputListFromForm = (key) => {
    setCoordinatesList((prevList) =>
      prevList.filter((item) => item.key !== key)
    );
  };

  const handleInputChange = (e, key, field, type) => {
    let value = type == "input" ? e.target.value : e;
    if (field.includes('coordinate')) {
      value = Number(value);
    }
    const updatedList = coordinatesList.map((item) => {
      if (item.key === key) {
        return {
          ...item,
          [field]: value
        };
      }
      return item;
    });
    setCoordinatesList(updatedList);
  };
  useEffect(() => {
    getZoneList();
  }, []);

  return (
    <Row>
      <Col span={24}>
        <List
          size={"large"}
          header={
            <Row
              className="bg-[#F9F9F8] h-14 text-center text-black font-semibold"
              style={{ textAlign: "center" }}
              align={"middle"}
            >
              <Col span={3}>
                <Text>{t('CoordinatesForm.utm')}</Text>
              </Col>
              <Col span={3} push={1}>
                <Text>{t('CoordinatesForm.border_point')}</Text>
              </Col>
              <Col span={6} push={1}>
                <Text>{t('CoordinatesForm.actual_coordinates')}</Text>
              </Col>
              <Col span={11} push={1}>
                <Row
                  align={"middle"}
                  className="flex  px-5 gap-5"
                  justify={"end"}
                >
                  <Upload
                    action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                    listType="picture"
                    name="file"
                    maxCount={1}
                    className="upload-list-inline"
                    accept=".xlsx"
                    beforeUpload={(file) => {
                      setUploadExcel(file);

                      return false;
                    }}
                    showUploadList={false}
                  >
                    <Button>{t('CoordinatesForm.importFromExcel')}</Button>
                  </Upload>

                  <p
                    className="text-[#b65f3b] cursor-pointer"
                    onClick={handleAddNewInputListToForm}
                  >
                    + {t('CommonContent.add')}
                  </p>
                </Row>
              </Col>
            </Row>
          }
          dataSource={coordinatesList}
          renderItem={(item) => (
            <List.Item key={item?.key}>
              <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col span={4} md={4}>
                  <Select
                    showSearch
                    style={{ textAlign: "left", border: "none", width: "100%" }}
                    options={utmOptions}
                    placeholder={t('CoordinatesForm.utm')}
                    value={item?.utm_id_hash}
                    onChange={(e) =>
                      handleInputChange(e, item?.key, "utm_id_hash", "select")
                    }
                    filterOption={(input, option) =>
                      option.label.toLowerCase().includes(input.toLowerCase())
                    }
                  />
                </Col>
                <Col span={4} md={4}>
                  <Input
                    placeholder={t('CoordinatesForm.border_point')}
                    name={'border_point'}
                    value={item?.border_point}
                    onChange={(e) =>
                      handleInputChange(e, item?.key, "border_point", "input")
                    }
                  />
                </Col>

                <Col span={14} md={14}>
                  <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    <Col span={8}>
                      <Input
                        placeholder={t('CoordinatesForm.coordinate_x')}
                        name={'x_coordinate'}
                        value={item?.x_coordinate}
                        onChange={(e) =>
                          handleInputChange(e, item?.key, "x_coordinate", "input")
                        }
                      />
                    </Col>
                    <Col span={8}>
                      <Input
                        placeholder={t('CoordinatesForm.coordinate_y')}
                        name={'y_coordinate'}
                        value={item?.y_coordinate}
                        onChange={(e) =>
                          handleInputChange(e, item?.key, "y_coordinate", "input")
                        }
                      />
                    </Col>
                    <Col span={8}>
                      <Input
                        placeholder={t('CoordinatesForm.coordinate_z')}
                        name={'z_coordinate'}
                        value={item?.z_coordinate}
                        onChange={(e) =>
                          handleInputChange(e, item?.key, "z_coordinate", "input")
                        }
                      />
                    </Col>
                  </Row>
                </Col>

                <Col span={2}>
                  {coordinatesList.length > 1 ? (
                    <Text>
                      <DeleteOutlined
                        size={16}
                        onClick={() => handleDeleteInputListFromForm(item?.key)}
                      />
                    </Text>
                  ) : null}
                </Col>
              </Row>
            </List.Item>
          )}
        />
      </Col>
    </Row>
  );
};

export default Index;
