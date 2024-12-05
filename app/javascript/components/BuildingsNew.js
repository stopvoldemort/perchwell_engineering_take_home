import React, { useState, useEffect } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";

const BuildingsNew = () => {
  const pathParts = window.location.pathname.split("/");
  const clientId = pathParts[2]; // Extract client ID from the path
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    console.log("useEffect triggered");
    axios
      .get(`/clients/${clientId}/buildings/new`, {
        headers: { Accept: "application/json" },
      })
      .then((response) => {
        console.log("New building data:", response.data);
        setFormData(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the buildings!", error);
      });
  }, [clientId]);

  return (
    <div>
      <h1>New Building</h1>
      <Formik
        initialValues={{ address: "" }}
        onSubmit={(values, { setSubmitting }) => {
          axios
            .post(`/clients/${clientId}/buildings`, values, {
              headers: { Accept: "application/json" },
            })
            .then(() => {
              window.location.href = "/buildings";
            })
            .catch((error) => {
              console.error("There was an error creating the building!", error);
            })
            .finally(() => {
              setSubmitting(false);
            });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <label htmlFor="address">Address:</label>
            <Field type="text" name="address" />
            <ErrorMessage name="address" component="div" />
            <button type="submit" disabled={isSubmitting}>
              Create
            </button>
          </Form>
        )}
      </Formik>
      <a href="/buildings">Back</a>
    </div>
  );
};

export default BuildingsNew;
