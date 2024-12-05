import React, { useEffect, useState } from "react";
import axios from "axios";

const BuildingsIndex = () => {
  const [buildings, setBuildings] = useState([]);

  useEffect(() => {
    console.log("useEffect triggered");
    axios
      .get("/buildings", { headers: { Accept: "application/json" } })
      .then((response) => {
        console.log("Buildings data:", response.data);
        setBuildings(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the buildings!", error);
      });
  }, []);

  return (
    <div>
      <h1>Buildings</h1>
      <a href="/buildings/new">New Building</a>
      <ul>
        {buildings.map((building) => (
          <div key={building.id}>
            <h2>{building.client_name}</h2>
            <h3>{building.address}</h3>
            {/* Iterate through the card to display any extra fields besides name, address, id,  */}
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
