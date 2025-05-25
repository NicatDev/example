import React, { useState, useEffect, useCallback } from "react";
import { Button, message, Popover, Table } from "antd";
import { EditOutlined, MoreOutlined, DeleteOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import FilterDrawer from "./FilterDrawer";
import PageHeader from "./PageHeader";
import ColumnHeader from "./ColumnHeader";
import { notify } from "../utils/notification";

export default function PageTemplate({
  title,
  columns,
  dataKey,
  onClickAdd,
  onClickUpdate,
  insertButtonText,
  insertActive = true,
  API,
  isRefresh,
  setIsRefresh
}) {
  const { t } = useTranslation();

  const [fullColumns, setFullColumns] = useState(columns);
  const [visibleColumns, setVisibleColumns] = useState(columns);
  const [showFilter, setShowFilter] = useState(false);
  const [allFilterableData, setAllFilterableData] = useState([]);
  const [filterableData, setFilterableData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [filteredField, setFilteredField] = useState("");
  const [tableLoading, setTableLoading] = useState(true);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchHeader, setSearchHeader] = useState("");

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
    showSizeChanger: true,
    pageSizeOptions: ["10", "20", "50", "100"],
    showTotal: (total) =>
      `${t("CommonContent.total")} ${total} ${t("CommonContent.items")}`,
    showQuickJumper: true,
  });

  const [searchObject, setSearchObject] = useState({
    SearchKey: "",
    Filter: [],
    Sort: [],
  });


    const editColumn = {
    filterColumn: false,
    sortFilter: false,
    fixed: "right",
    title: "",
    dataIndex: "_",
    key: "_",
    render: (text, record) => (
      <Popover
        className="px-3"
        trigger="click"
        placement="bottomLeft"
        content={
          <div className="flex flex-col">
            {isOtherFields ? (
              <>
                <Button
                  type="text"
                  className="!justify-start"
                  onClick={() => selectEditType(1, record)}
                  icon={<EditOutlined />}
                >
                  {t("CommonContent.group_edit")}
                </Button>
                <Button
                  type="text"
                  className="!justify-start"
                  onClick={() => selectEditType(2, record)}
                  icon={<EditOutlined />}
                >
                  {t("CommonContent.permission_edit")}
                </Button>
              </>
            ) : onClickUpdate ? (
              <Button
                type="text"
                className="!justify-start"
                onClick={() => onClickUpdate(record)}
                icon={<EditOutlined />}
              >
                {t("CommonContent.edit")}
              </Button>
            ) : null}

          </div>
        }
      >
        <Button type="text" icon={<MoreOutlined />} />
      </Popover>
    ),
  };

  const fetchTableData = async (params, withLoading = true) => {
    if (withLoading) setTableLoading(true);
    try {
      const queryParams = {
        ...params,
        Filter: params?.Filter?.length
          ? JSON.stringify(params.Filter)
          : undefined,
        Sort: params?.Sort?.length ? JSON.stringify(params.Sort) : undefined,
        SearchKey: params?.SearchKey?.length
          ? JSON.stringify(params.SearchKey)
          : "",
      };

      const res = await API.get(queryParams);

      setTableData(res.data.items || []);
      setPagination((prev) => ({
        ...prev,
        current: params["Pagination.OffSet"] || 1,
        pageSize: params["Pagination.Limit"] || 10,
        total: res.data.total_count || 0,
      }));
    } catch (error) {
      console.error("Failed to fetch table data:", error);
      message.error("Failed to load data");
    } finally {
      if (withLoading) setTableLoading(false);
    }
  };


  const initializeColumns = useCallback(() => {
    const updated = columns.map((col) => ({
      ...col,
      title: (
        <ColumnHeader
          key={col.dataIndex}
          title={col.title}
          onFilterClick={() => handleFilterOpen(col.dataIndex)}
          onSortClick={() => handleSort(col.dataIndex)}
          filter={col.filterColumn}
          sorter={col.sortFilter}
        />
      ),
    }));

    updated.push(editColumn);

    setFullColumns(updated);
    setVisibleColumns(updated);
  }, [columns]);

  const initializePage = async () => {
    try {
      const res = await API.getFilterbaleColumnsData();
      setAllFilterableData(res.data);
    } catch (error) {
      console.error("Failed to fetch filterable columns:", error);
    }
  };

  const changeSelectColumn = (selected) => {
    const updated = fullColumns.filter((col) =>
      selected.includes(col.dataIndex)
    );
    updated.push(editColumn);
    setVisibleColumns(updated);
  };

  const handleFilterOpen = (field) => {
    setFilteredField(field);
    setShowFilter(true);
  };

  const handleSearch = async (keyword) => {
    const updatedSearchObject = {
      ...searchObject,
      SearchKey: keyword,
    };
    const params = {
      "Pagination.Limit": 10,
      "Pagination.OffSet": 1,
      ...updatedSearchObject,
    };

    await fetchTableData(params);
    setSearchObject(updatedSearchObject);
    resetFilterState();
  };

  const handleFilterData = async (values) => {
    const updatedFilters = searchObject.Filter.filter(
      (f) => f.field !== filteredField
    );

    if (values.length > 0) {
      updatedFilters.push({ field: filteredField, values });
    }

    const updated = { ...searchObject, Filter: updatedFilters };
    setSearchObject(updated);
    fetchTableData({
      ...updated,
      "Pagination.Limit": 10,
      "Pagination.OffSet": 1,
    });
    resetFilterState();
  };

  const handleSort = async (field) => {
    setSearchObject((prev) => {
      let updatedSort = [...prev.Sort];
      const existingSort = updatedSort.find((s) => s.field === field);

      if (existingSort) {
        existingSort.direction =
          existingSort.direction === "asc" ? "desc" : undefined;
        if (!existingSort.direction) {
          updatedSort = updatedSort.filter((s) => s.field !== field);
        }
      } else {
        updatedSort.push({ field, direction: "asc" });
      }

      const updated = { ...prev, Sort: updatedSort };
      fetchTableData({
        ...updated,
        "Pagination.Limit": 10,
        "Pagination.OffSet": 1,
      });
      return updated;
    });

    resetFilterState();
  };

  const handleTableChange = (pagination) => {
    const params = {
      ...searchObject,
      "Pagination.OffSet": pagination.current,
      "Pagination.Limit": pagination.pageSize,
    };
    fetchTableData(params);
  };

  const clearFilter = () => {
    const cleared = {
      SearchKey: "",
      Filter: [],
      Sort: [],
    };
    setSearchObject(cleared);
    fetchTableData({
      ...cleared,
      "Pagination.Limit": 10,
      "Pagination.OffSet": 1,
    });
    setShowFilter(false);
    setFilteredField("");
    setSelectedCheckboxes([]);
    setSearchValue("");
    setSearchHeader("");
  };

  const resetFilterState = () => {
    setFilteredField("");
    setFilterableData([]);
    setShowFilter(false);
  };

  useEffect(() => {
    const params = {
      "Pagination.OffSet": pagination.current,
      "Pagination.Limit": pagination.pageSize,
    };
    fetchTableData(params);
  }, []);

  useEffect(() => {
    if (isRefresh) {
      const params = {
        "Pagination.OffSet": pagination.current,
        "Pagination.Limit": pagination.pageSize,
      };
      fetchTableData(params);
      setIsRefresh(false);
    }
  }, [isRefresh]);

  useEffect(() => {
    if (tableData.length === 0) {
      initializePage();
    }
  }, [tableData]);

  useEffect(() => {
    initializeColumns();
  }, [initializeColumns]);


  return (
    <div className="content-center flex-col">
      <PageHeader
        title={title}
        changeSelectColumn={changeSelectColumn}
        visibleColumns={visibleColumns}
        columns={columns}
        onClickAdd={onClickAdd}
        insertButtonText={insertButtonText}
        handleSearch={handleSearch}
        clearFilter={clearFilter}
        insertActive={insertActive}
        searchHeader={searchHeader}
        setSearchHeader={setSearchHeader}
      />
      <Table
        className="w-full h-full p-1"
        rowKey={dataKey}
        columns={visibleColumns}
        dataSource={tableData}
        loading={tableLoading}
        pagination={pagination}
        onChange={handleTableChange}
        scroll={{ x: "max-content" }}
      />

      <FilterDrawer
        open={showFilter}
        close={() => setShowFilter(false)}
        filterableData={filterableData}
        handleFilterData={handleFilterData}
        allFilterableData={allFilterableData}
        filteredField={filteredField}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        selectedCheckboxes={selectedCheckboxes}
        setSelectedCheckboxes={setSelectedCheckboxes}
      />
    </div>
  );
}
