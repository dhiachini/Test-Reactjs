import React, { useEffect, useState } from "react";
import BarChartComponent from "./BarChart";
import { transformData, sortDataByAverageDiameter } from "./utils";
import OrbitDropdown from "./OrbitDropdown";

const API_KEY = "fxeNqgDX6gOySiy2I5u4hQI5ju0FT15qan2rrU1K"; //Generated Api Key from nasa Apis

const DataFetcher = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrbit, setSelectedOrbit] = useState("all");

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
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 shadow-md rounded-lg relative">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 mt-4">
        <OrbitDropdown
          selectedOrbit={selectedOrbit}
          setSelectedOrbit={setSelectedOrbit}
        />
      </div>

      <div className="mt-20">
        <BarChartComponent data={filteredData} />
      </div>
    </div>
  );
};

export default DataFetcher;
