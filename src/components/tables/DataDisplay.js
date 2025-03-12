import React from "react";

const TableView = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="py-2 px-4 border">#</th>
            <th className="py-2 px-4 border">NEO Name</th>
            <th className="py-2 px-4 border">Min Estimated Diameter (km)</th>
            <th className="py-2 px-4 border">Max Estimated Diameter (km)</th>
          </tr>
        </thead>
        <tbody>
          {data.map((neo, index) => (
            <tr key={index} className="text-center border">
              <td className="py-2 px-4 border">{index + 1}</td>
              <td className="py-2 px-4 border">{neo.name}</td>
              <td className="py-2 px-4 border">{neo.minDiameter.toFixed(2)}</td>
              <td className="py-2 px-4 border">{neo.maxDiameter.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableView;
