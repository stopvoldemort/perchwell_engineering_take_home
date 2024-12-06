import React, { useState, useEffect } from "react";
import axios from "axios";
import { Formik } from "formik";
import BuildingForm from "./BuildingForm";

const BuildingsNew = () => {
  const pathParts = window.location.pathname.split("/");
  const clientId = pathParts[2]; // Extract client ID from the path
  const [customFieldTypes, setCustomFieldTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`/clients/${clientId}/buildings/new`, {
        headers: { Accept: "application/json" },
      })
      .then((response) => {
        console.log("New building data:", response.data);
        setCustomFieldTypes(response.data.custom_field_types);
        setLoading(false);
      })
      .catch((error) => {
        console.error(
          "There was an error fetching the new building data",
          error
        );
      });
  }, [clientId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const initialValues = () => {
    return {
      address: "",
      custom_fields_attributes: customFieldTypes.map((customFieldType) => ({
        custom_field_type_id: customFieldType.id,
        field_value: "",
        id: "",
      })),
    };
  };

  return (
    <div>
      <h1>New Building</h1>
      <Formik
        initialValues={initialValues()}
        onSubmit={(values, { setSubmitting }) => {
          console.log("Submitting values:", values);
          axios
            .post(
              submitPath,
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

export default BuildingsNew;
