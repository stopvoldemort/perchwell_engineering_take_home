import React, { useState, useEffect } from "react";
import axios from "axios";
import { Formik } from "formik";
import BuildingForm from "./BuildingForm";

const BuildingsEdit = () => {
  const pathParts = window.location.pathname.split("/");
  const buildId = pathParts[2]; // Extract building ID from the path
  const [customFieldTypes, setCustomFieldTypes] = useState([]);
  const [building, setBuilding] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`/buildings/${buildId}/edit`, {
        headers: { Accept: "application/json" },
      })
      .then((response) => {
        console.log("Edit building data:", response.data);
        setCustomFieldTypes(response.data.custom_field_types);
        setBuilding(response.data.building);
        setLoading(false);
      })
      .catch((error) => {
        console.error(
          "There was an error fetching the new building data",
          error
        );
      });
  }, [buildId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Edit Building</h1>
      <Formik
        initialValues={building}
        onSubmit={(values, { setSubmitting }) => {
          console.log("Submitting values:", values);
          axios
            .put(
              `/buildings/${building.id}`,
              { building: values },
              {
                headers: { Accept: "application/json" },
              }
            )
            .then(() => {
              window.location.href = "/buildings";
            })
            .catch((error) => {
              console.error("There was an error!", error);
            })
            .finally(() => {
              setSubmitting(false);
            });
        }}
      >
        {({ isSubmitting, values }) => (
          <BuildingForm
            customFieldTypes={customFieldTypes}
            isSubmitting={isSubmitting}
            values={values}
          />
        )}
      </Formik>
      <a href="/buildings">Back</a>
    </div>
  );
};

export default BuildingsEdit;
