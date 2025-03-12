import React, { useEffect, useState } from "react";
import BarChartComponent from "./BarChart";
import TableView from "./tables/TaleView";
import { transformData, sortDataByAverageDiameter } from "./utils";
import OrbitDropdown from "./OrbitDropdown";
import "./../styles.css";

const API_KEY = "fxeNqgDX6gOySiy2I5u4hQI5ju0FT15qan2rrU1K"; // Generated API Key from NASA APIs

const DataFetcher = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrbit, setSelectedOrbit] = useState("all");
  const [viewType, setViewType] = useState("chart"); // chart or table

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=${API_KEY}`
        );
        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }
        const result = await response.json();
        const transformedData = transformData(result.near_earth_objects);
        const sortedData = sortDataByAverageDiameter(transformedData);
        setData(sortedData);
        setFilteredData(sortedData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedOrbit === "all") {
      setFilteredData(data);
    } else {
      setFilteredData(data.filter((neo) => neo.orbitingBody === selectedOrbit));
    }
  }, [selectedOrbit, data]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
      </div>
    );
  if (error) return <div className="text-red-500">Error: {error.message}</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 shadow-md rounded-lg">

  <div className="dropdown-container">

    <OrbitDropdown
      selectedOrbit={selectedOrbit}
      setSelectedOrbit={setSelectedOrbit}
    />

    <select
      value={viewType}
      onChange={(e) => setViewType(e.target.value)}
      className="view-dropdown"
    >
      <option value="chart">Chart View</option>
      <option value="table">Table View</option>
    </select>
  </div>

  {/* Conditional rendering based on viewType */}
  {viewType === "chart" ? (
    <BarChartComponent data={filteredData} />
  ) : (
    <TableView data={filteredData} />
  )}
</div>

  );
};

export default DataFetcher;
