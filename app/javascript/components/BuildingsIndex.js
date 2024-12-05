import React, { useEffect, useState } from "react";
import axios from "axios";

const BuildingsIndex = () => {
  const [buildings, setBuildings] = useState([]);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    axios
      .get("/buildings", { headers: { Accept: "application/json" } })
      .then((response) => {
        console.log("Buildings index data:", response.data);
        setBuildings(response.data.buildings);
        setClients(response.data.clients);
      })
      .catch((error) => {
        console.error("There was an error fetching the buildings!", error);
      });
  }, []);

  return (
    <div>
      <h1>Buildings</h1>

      <label htmlFor="client-select">New building for </label>
      <select
        id="client-select"
        onChange={(e) => (window.location.href = e.target.value)}
      >
        <option value="">Select a client</option>
        {clients.map((client) => (
          <option key={client.id} value={`/clients/${client.id}/buildings/new`}>
            {client.name}
          </option>
        ))}
      </select>
      <ul>
        {buildings.map((building) => (
          <div
            key={`building-${building.id}-wrapper`}
            style={{
              border: "1px solid black",
              margin: "10px",
              padding: "5px",
            }}
          >
            <h2>Client: {building.client_name}</h2>
            <h3>Address: {building.address}</h3>
            {/* Iterate through the card to display any extra fields besides name, address, id */}
            {Object.keys(building).map((key) => {
              if (key !== "client_name" && key !== "address" && key !== "id") {
                return (
                  <h3 key={`${building.id}-${key}`}>
                    {key}: {building[key]}
                  </h3>
                );
              }
            })}
            <a href={`/buildings/${building.id}/edit`}>Edit</a>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default BuildingsIndex;
