import React, { useState } from "react";
import { CSVLink } from "react-csv";
import Pagination from "./Pagination";

const TableView = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const totalPages = Math.ceil(data.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentData = data.slice(indexOfFirstRow, indexOfLastRow);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const headers = [
    { label: "#", key: "id" },
    { label: "NEO Name", key: "name" },
    { label: "Min Estimated Diameter (km)", key: "minDiameter" },
    { label: "Max Estimated Diameter (km)", key: "maxDiameter" }
  ];

  const csvData = data.map((neo, index) => ({
    id: index + 1,
    name: neo.name,
    minDiameter: neo.minDiameter.toFixed(2),
    maxDiameter: neo.maxDiameter.toFixed(2),
  }));

  return (
    <div className="table-container">
      {/* CSV Download Button */}
      <div className="csv-button-container">
        <CSVLink
          data={csvData}
          headers={headers}
          filename="nasa_neo_data.csv"
          className="csv-download"
        >
          Download CSV
        </CSVLink>
      </div>

      {/* Table */}
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>NEO Name</th>
            <th>Min Estimated Diameter (km)</th>
            <th>Max Estimated Diameter (km)</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((neo, index) => (
            <tr key={index}>
              <td>{indexOfFirstRow + index + 1}.</td>
              <td>{neo.name}</td>
              <td>{neo.minDiameter.toFixed(2)}</td>
              <td>{neo.maxDiameter.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Component */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        nextPage={nextPage}
        prevPage={prevPage}
      />
    </div>
  );
};

export default TableView;
