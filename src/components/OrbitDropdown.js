import React, { useState } from "react";
import { FaSearch, FaCheck } from "react-icons/fa";
import "./OrbitDropdown.css";

const orbits = ["all", "Earth", "Jupti", "Mars", "Merc"];

const OrbitDropdown = ({ selectedOrbit, setSelectedOrbit }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredOrbits = orbits.filter((orbit) =>
    orbit.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dropdown-wrapper">
      <div
        className="dropdown-header cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        Orbiting Body({" "}
        {selectedOrbit.charAt(0).toUpperCase() + selectedOrbit.slice(1)})
      </div>

      {isOpen && (
        <div className="dropdown-content">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Type to search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Options list*/}
          <ul className="orbit-list">
            {filteredOrbits.map((orbit) => (
              <li
                key={orbit}
                className={`orbit-item ${
                  selectedOrbit === orbit ? "selected" : ""
                }`}
                onClick={() => {
                  setSelectedOrbit(orbit);
                  setIsOpen(false);
                }}
              >
                {selectedOrbit === orbit && <FaCheck className="check-icon" />}
                {orbit}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default OrbitDropdown;
