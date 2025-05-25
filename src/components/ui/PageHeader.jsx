import { Button, Input, Select } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";

export default function PageHeader({
  title,
  changeSelectColumn,
  visibleColumns,
  columns,
  onClickAdd,
  insertButtonText,
  handleSearch,
  clearFilter,
  insertActive,
  searchHeader,
  setSearchHeader
}) {
  const { t } = useTranslation();

  return (
    <div className="flex w-full p-4  items-center justify-between ">
      <span className="font-semibold text-lg">{title}</span>
      <div className="flex">
        <Input.Search
          className="mx-2"
          placeholder={t("CommonContent.search")}
          value={searchHeader}
          onSearch={(e) => handleSearch(e)}
          onChange={(e) => setSearchHeader(e.target.value)}
        />

        <Select
          placeholder={t("CommonContent.tableSettings")}
          mode="multiple"
          className="w-[500px]"
          allowClear
          maxTagCount="responsive"
          onChange={changeSelectColumn}
          defaultValue={visibleColumns?.filter((val) => val.dataIndex)}
          options={columns.map((item) => {
            return { label: item.title, value: item.dataIndex };
          })}
        />
        <Button type="" className="ml-2" onClick={clearFilter}>
          {t("CommonContent.clearFilter")}
        </Button>
        {insertActive  && (
          <Button type="primary" onClick={onClickAdd} className="mx-2">
            {insertButtonText}
          </Button>
        )}
      </div>
    </div>
  );
}
