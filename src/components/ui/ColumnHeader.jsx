import { FilterFilled } from "@ant-design/icons";
import { Col } from "antd";
import { SortIcon } from "@/components/icons";

const Index = ({
  title,
  onFilterClick,
  onSortClick,
  filter = true,
  sorter = true,
}) => {
  return (
    <div className="flex justify-between items-center">
      {title}
      <Col style={{ display: "flex", gap: "5px" }}>
        {sorter && (
          <div
            className="cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              onSortClick();
            }}
          >
            <SortIcon />
          </div>
        )}
        {filter && (
          <FilterFilled
            style={{ color: "#cacaca" }}
            onClick={(e) => {
              e.stopPropagation();
              onFilterClick();
            }}
          />
        )}
      </Col>
    </div>
  );
};

export default Index;
