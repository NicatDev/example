import { Button, Checkbox, Drawer, Input, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function FilterDrawer({
  open,
  close,
  handleFilterData,
  filteredField,
  allFilterableData,
  searchValue,
  setSearchValue,
  selectedCheckboxes,
  setSelectedCheckboxes,
}) {
  const { t } = useTranslation();
  const [checkboxValues, setCheckboxValues] = useState([]);
  const getInitialFilter = async () => {
    let fieldData = allFilterableData.find(
      (item) => item.field === filteredField
    );
    setCheckboxValues(fieldData?.values);
  };

  const handleSearch = (value) => {
    let fieldData = allFilterableData.find(
      (item) => item.field === filteredField
    );
    const searchedData = fieldData?.values.filter((i) =>
      i?.toLowerCase().includes(value.toLowerCase())
    );
    setCheckboxValues(searchedData);
  };

  const handleChangeFilter = (value, event) => {
    setSelectedCheckboxes((prev) => {
      if (event.target.checked) {
        return prev.includes(value) ? prev : [...prev, value];
      } else {
        return prev.filter((item) => item !== value);
      }
    });
  };
  

  useEffect(() => {
    if (open) {
      getInitialFilter();
    }
  }, [filteredField, open]);

  const resetFilter = () => {
    setSelectedCheckboxes([]);
    setSearchValue("");
  };

  const closeDrawer = () => {
    close();
    setSearchValue("");
  };

  const renderCheckboxes = () => {
    switch (filteredField) {
      case "is_deleted":
        return (
          <>
            <div className="my-1">
              <Checkbox
                value={"False"}
                onChange={(e) => handleChangeFilter(item, e)}
              >
                {t("CommonContent.active")}
              </Checkbox>
            </div>
            <div className="my-1">
              <Checkbox
                value={"True"}
                onChange={(e) => handleChangeFilter(item, e)}
              >
                {t("CommonContent.deactive")}
              </Checkbox>
            </div>
          </>
        );
      default:
        return checkboxValues?.map((item, index) => (
          <div key={index} className="my-1">
            <Checkbox
              value={item}
              onChange={(e) => handleChangeFilter(item, e)}
            >
              {item}
            </Checkbox>
          </div>
        ));
    }
  };

  return (
    <Drawer
      title={t("CommonContent.filter")}
      open={open}
      onClose={closeDrawer}
      extra={
        <Space>
          <Button onClick={() => resetFilter()}>
            {t("CommonContent.clearFilter")}
          </Button>
          <Button
            onClick={() => handleFilterData(selectedCheckboxes)}
            type="primary"
          >
            {t("CommonContent.filter")}
          </Button>
        </Space>
      }
    >
      <Input.Search
        placeholder={t("CommonContent.search")}
        allowClear
        value={searchValue}
        onChange={(e) => {
          setSearchValue((prevState) => (prevState = e.target.value));
          handleSearch(e.target.value);
        }}
      />
      <div className="mt-5">
        <Checkbox.Group
          value={selectedCheckboxes}
          // onChange={handleChangeFilter}
        >
          <div className="flex flex-col">{renderCheckboxes()}</div>
        </Checkbox.Group>
      </div>
    </Drawer>
  );
}
