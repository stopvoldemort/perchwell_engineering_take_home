import React, { useState } from "react";
import axios from "axios";

const BuildingsNew = () => {
  const [building, setBuilding] = useState({
    client_name: "",
    address: "",
    // Add more fields as necessary
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBuilding({ ...building, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/buildings", building, { headers: { Accept: "application/json" } })
      .then(() => {
        window.location.href = "/buildings";
      })
      .catch((error) => {
        console.error("There was an error creating the building!", error);
      });
  };

  return (
    <div>
      <h1>New Building</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={building.address}
            onChange={handleInputChange}
          />
        </label>
        {/* Add more fields as necessary */}
        <button type="submit">Create</button>
      </form>
      <a href="/buildings">Back</a>
    </div>
  );
};

export default BuildingsNew;
