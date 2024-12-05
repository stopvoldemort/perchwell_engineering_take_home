// Entry point for the build script in your package.json
import React from "react";
import ReactDOM from "react-dom";
import BuildingsIndex from "./components/BuildingsIndex";
import BuildingsNew from "./components/BuildingsNew";
import BuildingsEdit from "./components/BuildingsEdit";

document.addEventListener("DOMContentLoaded", () => {
  const indexNode = document.getElementById("buildings-index");
  if (indexNode) {
    ReactDOM.render(<BuildingsIndex />, indexNode);
  }

  const newNode = document.getElementById("buildings-new");
  if (newNode) {
    ReactDOM.render(<BuildingsNew />, newNode);
  }

  const editNode = document.getElementById("buildings-edit");
  if (editNode) {
    ReactDOM.render(<BuildingsEdit />, editNode);
  }
});
