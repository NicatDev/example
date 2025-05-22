import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Col, Input, Row, Typography, Button, Select } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

const { Search } = Input;

const Index = (props) => {
  const { t } = useTranslation();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const { Title } = Typography;

  const {
    activePage,
    newButtonContent,
    clearAllFilters,
    checkedColumnList,
    checkedColumnChange,
    columns,
  } = props;

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const filteredColumns = columns?.filter(({ name }) =>
    name?.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSelectChange = (value) => {
    const newValue = value;
    checkedColumnChange(newValue);
  };

  const handleDropdownVisible = (open) => {
    setIsDropdownOpen(open);
  };

  const handleLinkToCreate = () => {
    navigate(import.meta.env.VITE_ADD_COUNTRY);
  };

  return (
    <Row className="p-2.5 bg-white">
      <Col span={8}>
        <Row>
          <Col span={24}>
            <Title level={5}>{activePage} </Title>
          </Col>
        </Row>
      </Col>

      <Col span={16}>
        <Row
          gutter="12"
          className="flex flex-row flex-nowrap justify-end items-center"
        >
          <Col span={6}>
            <Search placeholder={t("CommonContent.search")} allowClear={true} />
          </Col>

          <Col span={8} lg={6}>
            <Select
              className="w-full"
              suffixIcon={
                <div>
                  <EllipsisOutlined
                    onClick={() => handleDropdownVisible(!isDropdownOpen)}
                  />
                </div>
              }
              mode="multiple"
              showSearch={false}
              value={checkedColumnList?.filter((val) => val)}
              dropdownRender={(menu) => (
                <>
                  <Row>
                    <Search
                      onKeyDown={(e) => e.stopPropagation()}
                      placeholder={t("CommonContent.search")}
                      onChange={(e) => handleSearch(e.target.value)}
                    />
                  </Row>
                  {menu}
                </>
              )}
              onInputKeyDown={(e) => e.stopPropagation()}
              onDropdownVisibleChange={handleDropdownVisible}
              open={isDropdownOpen}
              onChange={handleSelectChange}
              maxTagCount="responsive"
              allowClear={false}
            >
              {filteredColumns?.map(
                ({ key, name }, index) =>
                  key && (
                    <Option key={index} value={key}>
                      {name}
                    </Option>
                  )
              )}
            </Select>
          </Col>

          <Col>
            <Button onClick={clearAllFilters}>
              {t("CommonContent.clearFilter")}
            </Button>
          </Col>

          <Col>
            <Button onClick={handleLinkToCreate} type="primary">
              {newButtonContent}
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Index;
