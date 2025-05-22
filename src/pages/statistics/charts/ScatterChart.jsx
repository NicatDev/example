import { Scatter } from "@ant-design/plots";

const ScatterChart = ({ chartData }) => {
  const config = {
    height:320,
    data: chartData,
    xField: "x",
    yField: "y",
    colorField: "category",
    sizeField: 5,
    shapeField: "category",
    scale: {
      shape: { range: ["point"] },
    },
    legend: false,
  };

  return <>
  <Scatter {...config} />
  </>;
};

export default ScatterChart;
