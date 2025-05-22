// React & library imports
import React, { useState, useRef, useMemo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button, Dropdown, Menu, message, Pagination, Spin } from "antd";
import {
  DownloadOutlined,
  PlusOutlined,
  FileAddOutlined,
} from "@ant-design/icons";

// AG Grid Enterprise modules
import {
  ClientSideRowModelModule,
  MenuModule,
  ClipboardModule,
  TextEditorModule,
  ColumnAutoSizeModule,
  RowDragModule,
  AllEnterpriseModule,
  ExcelExportModule,
  ModuleRegistry,
  themeQuartz,
  iconSetMaterial,
} from "ag-grid-enterprise";
import { AgGridReact } from "ag-grid-react";

// Custom modal and renderers
import CreateModal from "./add";
import UpdateModal from "./update";
import Renderer from "@/components/dynamic/renderers";

// Register AG Grid modules
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  MenuModule,
  ClipboardModule,
  TextEditorModule,
  ColumnAutoSizeModule,
  RowDragModule,
  AllEnterpriseModule,
  ExcelExportModule,
]);

const Index = ({ TableIdHash, API }) => {
  // ===== Constants & Refs =====
  const { t } = useTranslation();
  const gridRef = useRef(null);
  const gridApi = useRef(null);
  const columnApi = useRef(null);
  const showdata = useRef({
    "Pagination.Limit": 10,
    "Pagination.OffSet": 1,
  });

  // ===== State Management =====
  const [rowData, setRowData] = useState([]);
  const [columnDefs, setColumnDefs] = useState([]);
  const [columnDropdownDefs, setColumnDropdownDefs] = useState([]);
  const [columnGroups, setColumnGroups] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedColumn, setEditedColumn] = useState(null);
  const [selectedColumn, setSelectedColumn] = useState(null);
  const [loading, setLoading] = useState(false);

  // AG Grid's locale keys
  const agGridLocaleKeys = [
    "selectAll",
    "selectAllSearchResults",
    "addCurrentSelectionToFilter",
    "searchOoo",
    "blanks",
    "noMatches",
    "filterOoo",
    "equals",
    "notEqual",
    "blank",
    "notBlank",
    "empty",
    "lessThan",
    "greaterThan",
    "lessThanOrEqual",
    "greaterThanOrEqual",
    "inRange",
    "inRangeStart",
    "inRangeEnd",
    "contains",
    "notContains",
    "startsWith",
    "endsWith",
    "dateFormatOoo",
    "before",
    "after",
    "andCondition",
    "orCondition",
    "applyFilter",
    "resetFilter",
    "clearFilter",
    "cancelFilter",
    "textFilter",
    "numberFilter",
    "dateFilter",
    "setFilter",
    "groupFilterSelect",
    "advancedFilterContains",
    "advancedFilterNotContains",
    "advancedFilterTextEquals",
    "advancedFilterTextNotEqual",
    "advancedFilterStartsWith",
    "advancedFilterEndsWith",
    "advancedFilterBlank",
    "advancedFilterNotBlank",
    "advancedFilterEquals",
    "advancedFilterNotEqual",
    "advancedFilterGreaterThan",
    "advancedFilterGreaterThanOrEqual",
    "advancedFilterLessThan",
    "advancedFilterLessThanOrEqual",
    "advancedFilterTrue",
    "advancedFilterFalse",
    "advancedFilterAnd",
    "advancedFilterOr",
    "advancedFilterApply",
    "advancedFilterBuilder",
    "advancedFilterValidationMissingColumn",
    "advancedFilterValidationMissingOption",
    "advancedFilterValidationMissingValue",
    "advancedFilterValidationInvalidColumn",
    "advancedFilterValidationInvalidOption",
    "advancedFilterValidationMissingQuote",
    "advancedFilterValidationNotANumber",
    "advancedFilterValidationInvalidDate",
    "advancedFilterValidationMissingCondition",
    "advancedFilterValidationJoinOperatorMismatch",
    "advancedFilterValidationInvalidJoinOperator",
    "advancedFilterValidationMissingEndBracket",
    "advancedFilterValidationExtraEndBracket",
    "advancedFilterValidationMessage",
    "advancedFilterValidationMessageAtEnd",
    "advancedFilterBuilderTitle",
    "advancedFilterBuilderApply",
    "advancedFilterBuilderCancel",
    "advancedFilterBuilderAddButtonTooltip",
    "advancedFilterBuilderRemoveButtonTooltip",
    "advancedFilterBuilderMoveUpButtonTooltip",
    "advancedFilterBuilderMoveDownButtonTooltip",
    "advancedFilterBuilderAddJoin",
    "advancedFilterBuilderAddCondition",
    "advancedFilterBuilderSelectColumn",
    "advancedFilterBuilderSelectOption",
    "advancedFilterBuilderEnterValue",
    "advancedFilterBuilderValidationAlreadyApplied",
    "advancedFilterBuilderValidationIncomplete",
    "advancedFilterBuilderValidationSelectColumn",
    "advancedFilterBuilderValidationSelectOption",
    "advancedFilterBuilderValidationEnterValue",
    "columns",
    "filters",
    "pivotMode",
    "groups",
    "rowGroupColumnsEmptyMessage",
    "values",
    "valueColumnsEmptyMessage",
    "pivots",
    "pivotColumnsEmptyMessage",
    "group",
    "rowDragRow",
    "rowDragRows",
    "loadingOoo",
    "loadingError",
    "noRowsToShow",
    "enabled",
    "pinColumn",
    "pinLeft",
    "pinRight",
    "noPin",
    "valueAggregation",
    "noAggregation",
    "autosizeThisColumn",
    "autosizeAllColumns",
    "groupBy",
    "ungroupBy",
    "ungroupAll",
    "addToValues",
    "removeFromValues",
    "addToLabels",
    "removeFromLabels",
    "resetColumns",
    "expandAll",
    "collapseAll",
    "copy",
    "ctrlC",
    "ctrlX",
    "copyWithHeaders",
    "copyWithGroupHeaders",
    "cut",
    "paste",
    "ctrlV",
    "export",
    "csvExport",
    "excelExport",
    "columnFilter",
    "columnChooser",
    "chooseColumns",
    "sortAscending",
    "sortDescending",
    "sortUnSort",
    "sum",
    "first",
    "last",
    "min",
    "max",
    "none",
    "count",
    "avg",
    "filteredRows",
    "selectedRows",
    "totalRows",
    "totalAndFilteredRows",
    "more",
    "to",
    "of",
    "page",
    "pageLastRowUnknown",
    "nextPage",
    "lastPage",
    "firstPage",
    "previousPage",
    "pageSizeSelectorLabel",
    "footerTotal",
    "statusBarLastRowUnknown",
    "pivotColumnGroupTotals",
    "pivotChartAndPivotMode",
    "pivotChart",
    "chartRange",
    "columnChart",
    "groupedColumn",
    "stackedColumn",
    "normalizedColumn",
    "barChart",
    "groupedBar",
    "stackedBar",
    "normalizedBar",
    "pieChart",
    "pie",
    "donut",
    "lineChart",
    "stackedLine",
    "normalizedLine",
    "xyChart",
    "scatter",
    "bubble",
    "areaChart",
    "area",
    "stackedArea",
    "normalizedArea",
    "histogramChart",
    "polarChart",
    "radarLine",
    "radarArea",
    "nightingale",
    "radialColumn",
    "radialBar",
    "statisticalChart",
    "boxPlot",
    "rangeBar",
    "rangeArea",
    "hierarchicalChart",
    "treemap",
    "sunburst",
    "specializedChart",
    "waterfall",
    "heatmap",
    "combinationChart",
    "columnLineCombo",
    "AreaColumnCombo",
  ];

  const localeText = agGridLocaleKeys.reduce((acc, key) => {
    acc[key] = t(`agGrid.${key}`);
    return acc;
  }, {});

  // ===== Memoized Configurations =====
  const inputTypeToCellType = useMemo(
    () => ({
      1: "text",
      2: "number",
      3: "selectionList",
      4: "text",
      5: "date",
      6: "datetime",
      7: "file",
      8: "qrCode",
      9: "selectBox",
    }),
    []
  );

  const theme = useMemo(
    () => themeQuartz.withParams({ spacing: 4 }).withPart(iconSetMaterial),
    []
  );

  const cellRendererSelector = (cellDataType) => {
    const renderers = {
      date: Renderer.DateRenderer,
      qrCode: Renderer.QRCodeRenderer,
      selectBox: Renderer.CheckboxRenderer,
      datetime: Renderer.DateTimeRenderer,
      selectionList: Renderer.SelectRenderer,
      number: Renderer.NumberRenderer,
      file: Renderer.FileRenderer,
    };
    return renderers[cellDataType]
      ? (params) => React.createElement(renderers[cellDataType], { ...params })
      : undefined;
  };

  const getCellIdHash = (columnIdHash, rowIndex) =>
    columnGroups[columnIdHash]?.[rowIndex]?.id_hash || null;

  const onCellValueChangeUpdateColumnGroups = (colId, rowIdx, value) => {
    const updatedGroups = { ...columnGroups };
    updatedGroups[colId][rowIdx].value = value;
    setColumnGroups(updatedGroups);

    const updatedRows = [...rowData];
    updatedRows[rowIdx][colId] = value;
    setRowData(updatedRows);
  };

  const transformBackendData = (data) => {
    const grouped = {};
    data.items.sort((a, b) => a.column.display_order - b.column.display_order);
    data.items.forEach(({ column, id_hash, value, display_order }) => {
      const colId = column.id_hash;
      if (!grouped[colId]) grouped[colId] = [];
      grouped[colId].push({ id_hash, value: value || "", display_order });
    });
    setColumnGroups(grouped);

    const colDefs = Object.entries(grouped).map(([colId, values], index) => {
      const { column } = data.items.find(
        (item) => item.column.id_hash === colId
      );
      const cellDataType = inputTypeToCellType[column.input_type] || "text";
      return {
        rowDrag: index === 0,
        field: colId,
        headerName: column.name || "Unknown",
        cellRenderer: cellRendererSelector(cellDataType),
        cellEditorSelector: cellRendererSelector(cellDataType),
        editable: true,
        related_column_id_hash: column.related_column_id_hash,
        description: column.description,
        input_type: column.input_type,
      };
    });

    const rowCount = Math.max(...Object.values(grouped).map((g) => g.length));
    const rows = Array.from({ length: rowCount }).map((_, i) => {
      const rowData = Object.fromEntries(
        Object.entries(grouped).map(([colId, values]) => [
          colId,
          values[i]?.value || "",
        ])
      );
      rowData.display_order =
        grouped[Object.keys(grouped)[0]]?.[i]?.display_order ?? null;
      return rowData;
    });
    return { columnDefs: colDefs, rowData: rows };
  };

  const getDropdownItems = (columns) => {
    const items = columns.map((item, index) => ({
      key: index,
      label: (
        <Button
          className="w-[100%]"
          onClick={() => {
            setIsEditModalOpen(true);
            setEditedColumn(item?.field);
          }}
        >
          {item?.headerName}
        </Button>
      ),
    }));
    setColumnDropdownDefs(items);
  };
  // ===== Async Actions =====
  const getInitalData = async () => {
    setLoading(true);
    try {
      const res = await API.getDynamicValue({
        TableIdHash,
        ...showdata.current,
      });
      const { columnDefs, rowData } = transformBackendData(res.data);
      showdata.current.total = res.data.total_count;
      getDropdownItems(columnDefs);
      setColumnDefs(columnDefs);
      setRowData(rowData);
    } finally {
      setLoading(false);
    }
  };

  const addEmptyRow = async () => {
    await API.addEmptyRow({ dynamic_table_id_hash: TableIdHash });
    await getInitalData();
  };

  const onCellValueChanged = ({ oldValue, newValue, column, rowIndex }) => {
    const colId = column.getColId();
    const cellId = getCellIdHash(colId, rowIndex);
    const valueStr = newValue?.toString?.() ?? newValue;

    const payload = {
      id_hash: cellId,
      value: valueStr,
      dynamic_column_id_hash: TableIdHash,
    };

    API.updateCellValue(payload)
      .then(() =>
        onCellValueChangeUpdateColumnGroups(colId, rowIndex, newValue)
      )
      .catch(() => {
        onCellValueChangeUpdateColumnGroups(colId, rowIndex, oldValue);
        message.error(t("message.updateFailed"));
      });
  };

  const handleFileUpload = (event) => {
    setLoading(true);
    const file = event.target.files?.[0];
    const formData = new FormData();
    formData.append("file", file);
    API.importExcel(TableIdHash, formData)
      .then(() => {
        setLoading(false);
        getInitalData();
      })
      .catch(() => {
        console.error("Error: Import Excel unsucsessfully");
      });
  };

  const handleDownload = async () => {
    try {
      const response = await API.getExcelTemplate(TableIdHash);

      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;

      link.download = "template.xlsx";
      document.body.appendChild(link);
      link.click();

      window.URL.revokeObjectURL(url);
      link.remove();
    } catch (error) {
      console.error("Download error:", error);
    }
  };

  // ===== Lifecycle =====
  useEffect(() => {
    getInitalData();
  }, [TableIdHash]);

  const columnMoved = (event) => {
    const index = event.toIndex;
    const columnId = event.column?.coldef?.field;
  };

  const handleRowDrag = (event) => {
    const index = rowData[event.overIndex]?.display_order;
    const newIndex = event?.node?.data?.display_order;
    const params = {
      from_display_order: newIndex,
      to_display_order: index,
      dynamic_table_id_hash: TableIdHash,
    };
    API.exchangeOrder(params).finally(() => {
      // getInitalData();
    });
  };

  const onPageChange = (page) => {
    showdata.current["Pagination.OffSet"] = page;
    getInitalData();
  };

  // ===== Render =====

  console.log("success");
  return (
    <div>
      {/* Header Buttons */}
      <div className="flex w-full p-4 items-center justify-between">
        <div className="flex gap-7 items-center">
          <span className="text-lg font-semibold text-gray-800">
            {t("Dynamic.headerContent.title")}
          </span>
          <Button
            className="bg-blue-500 text-white"
            onClick={addEmptyRow}
            icon={<PlusOutlined />}
          >
            {t("Dynamic.headerContent.createRow")}
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="file"
            accept=".xlsx, .xls"
            hidden
            id="excelFileInput"
            onChange={handleFileUpload}
          />
          <Button
            onClick={() => document.getElementById("excelFileInput").click()}
            icon={<FileAddOutlined />}
          >
            {t("Dynamic.headerContent.importExcel")}
          </Button>
          <Button onClick={handleDownload} icon={<DownloadOutlined />}>
            {t("Dynamic.headerContent.downloadExample")}
          </Button>
          <Dropdown
            menu={{
              items: columnDropdownDefs,
              className: "h-70 overflow-y-auto",
            }}
            trigger={["click"]}
            placement="bottomRight"
          >
            <Button
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              Sütun yenilə
            </Button>
          </Dropdown>

          <Button
            type="primary"
            className="bg-blue-600 text-white"
            onClick={() => setIsModalOpen(true)}
            icon={<PlusOutlined />}
          >
            {t("Dynamic.headerContent.createColumn")}
          </Button>
        </div>
      </div>

      {/* AG Grid Table or Loading Spinner */}
      {loading ? (
        <Spin className="w-full p-4" />
      ) : (
        <div
          style={{ height: "calc(-200px + 100vh)" }}
          className="ag-theme-alpine"
        >
          <AgGridReact
            onGridReady={(params) => {
              gridApi.current = params.api;
              columnApi.current = params.columnApi;
            }}
            theme={theme}
            gridOptions={{
              clipboard: true,
              rowDragManaged: true,
              onRowDragEnd: handleRowDrag,
            }}
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            rowSelection="multiple"
            animateRows
            rowDragManaged
            onCellValueChanged={onCellValueChanged}
            enableRangeSelection
            enableFillHandle
            suppressClearOnFillReduction
            defaultColDef={{
              resizable: true,
              sortable: true,
              filter: true,
              editable: true,
            }}
            rowHeight={45}
            localeText={localeText}
            onColumnMoved={columnMoved}
          />
          <div className="bg-white p-3">
            <Pagination
              onChange={onPageChange}
              current={showdata?.current["Pagination.OffSet"]}
              total={showdata.current?.total}
              pageSize={showdata?.current["Pagination.Limit"]}
              showSizeChanger
              showQuickJumper
              showTotal={(total) =>
                `${t("CommonContent.total")} ${total} ${t(
                  "CommonContent.items"
                )}`
              }
            />
          </div>
        </div>
      )}

      <CreateModal
        open={isModalOpen}
        setOpen={setIsModalOpen}
        columnDefs={columnDefs}
        selectedColumn={selectedColumn}
        setSelectedColumn={setSelectedColumn}
        dynamic_table_id_hash={TableIdHash}
        refreshTableData={getInitalData}
      />
      <UpdateModal
        open={isEditModalOpen}
        setOpen={setIsEditModalOpen}
        columnDefs={columnDefs}
        selectedColumn={selectedColumn}
        setSelectedColumn={setSelectedColumn}
        dynamic_table_id_hash={TableIdHash}
        refreshTableData={getInitalData}
        itemId={editedColumn}
      />
    </div>
  );
};

export default Index;
