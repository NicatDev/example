import React, { useEffect, useState } from "react";
import API from "../../api";
import { useTranslation } from "react-i18next";
import ScatterChart from "./charts/ScatterChart.jsx";
import DonutChart from "./charts/DonutChart.jsx";
import LineChart from "./charts/LineChart.jsx";

export default function Index() {
  const { t } = useTranslation();

  const [chartData, setChartData] = useState([
    { category: "setosa", x: 4.7, y: 3.3 },
    { category: "setosa", x: 4.9, y: 3.4 },
    { category: "setosa", x: 4.4, y: 3.3 },
    { category: "setosa", x: 4.1, y: 3.3 },
    { category: "af", x: 4.9, y: 3.3 },
    { category: "setosa", x: 4.7, y: 3 },
    { category: "setosa", x: 4.6, y: 3.3 },
    { category: "setosa", x: 4.5, y: 3.3 },
  ]);

  const getInit = async () => {};

  // useEffect(() => {
  //   getInit();
  // }, [])

  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-2 bg-[#f8f8f8]">
      {/* First two-column chart */}
      <div className="bg-white p-4 rounded ">
        <div className="flex">
          <div className="w-1/3">
            <DonutChart />
          </div>
          <div className="w-2/3 pl-4">
            <p className="font-semibold mb-2">Chart title</p>
            <ScatterChart chartData={chartData} />
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded ">
        <div className="flex">
          <div className="w-1/3">
            <DonutChart />
          </div>
          <div className="w-2/3 pl-4">
            <p className="font-semibold mb-2">Chart title</p>
            <ScatterChart chartData={chartData} />
          </div>
        </div>
      </div>

      {/* Third chart row */}
      <div className="bg-white p-4 rounded  col-span-1 md:col-span-1">
        <div className="flex">
          <div className="w-1/3">
            <DonutChart />
          </div>
          <div className="w-2/3 pl-4">
            <p className="font-semibold mb-2">Chart title</p>
            <ScatterChart chartData={chartData} />
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded  col-span-1 md:col-span-1">
        <p className="font-semibold mb-2">Chart title</p>
        <ScatterChart chartData={chartData} />
      </div>

      {/* Full width chart */}
      <div className="bg-white p-4 rounded  col-span-1 md:col-span-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="font-semibold mb-2">Chart title</p>
            <LineChart chartData={chartData} />
          </div>
        </div>
      </div>
    </div>
  );
}
