import React from "react";

const TableView = ({ data }) => {
  return (
    <div className="table-container">
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
          {data.map((neo, index) => (
            <tr key={index}>
              <td>{index + 1}.</td>
              <td>{neo.name}</td>
              <td>{neo.minDiameter.toFixed(2)}</td>
              <td>{neo.maxDiameter.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableView;
