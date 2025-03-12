import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./BarChart.css";

const BarChartComponent = ({ data }) => {
  return (
    <div className="chart-wrapper p-4 bg-white shadow-lg rounded-lg flex relative">
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2" style={{ writingMode: "vertical-rl", textAlign: "center", fontSize: "1.25rem", fontWeight: "bold", marginRight: "-10px" }}>
        NEO Name
      </div>
      <div className="bar-chart-container flex-1 ml-0">
        <ResponsiveContainer width="100%" height={700}>
          <BarChart
            layout="vertical"
            data={data}
            margin={{
              top: 20,
              right: 50,
              left: 100,
              bottom: 20,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              type="number"
              domain={[0, 4.5]}
              ticks={[0, 1, 2, 3, 4]}
              tick={{ fontSize: 14, dy: 10 }}
              interval={0}
              padding={{ left: 10, right: 10 }}
            />
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fontSize: 12, fill: "#333" }}
              interval={0}
              width={140}
            />
            <Tooltip className="rounded-md shadow-lg" />
            <Legend align="left" verticalAlign="top" wrapperStyle={{ paddingBottom: 20 }} />
            <Bar dataKey="minDiameter" name="Min Diameter (km)" fill="#1e90ff" barSize={20} />
            <Bar dataKey="maxDiameter" name="Max Diameter (km)" fill="#ff4500" barSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChartComponent;
