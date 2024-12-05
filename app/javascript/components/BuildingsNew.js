import React, { useState, useEffect } from "react";
import axios from "axios";
import { Formik, Form, Field, FieldArray } from "formik";

const CategoricalCustomField = ({ customFieldType, fieldValueName }) => (
  <Field as="select" name={fieldValueName}>
    <option value="">Select an option</option>
    {customFieldType.allowed_values.map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ))}
  </Field>
);

const CustomFieldValue = ({ customFieldType, index }) => {
  const fieldValueName = `custom_fields_attributes.${index}.field_value`;

  return (
    <div
      key={`building-${customFieldType.id}-wrapper`}
      style={{ border: "1px solid lightblack" }}
    >
      <label htmlFor={fieldValueName}>{customFieldType.name}</label>
      <Field
        type="hidden"
        name={`custom_fields_attributes.${index}.custom_field_type_id`}
        value={customFieldType.id}
      />
      {customFieldType.value_type === "categorical" ? (
        <CategoricalCustomField
          customFieldType={customFieldType}
          fieldValueName={fieldValueName}
        />
      ) : (
        <Field
          type={`${
            customFieldType.field_type === "number" ? "number" : "text"
          }`}
          name={fieldValueName}
        />
      )}
    </div>
  );
};

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
              `/clients/${clientId}/buildings`,
              { building: values },
              {
                headers: { Accept: "application/json" },
              }
            )
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
            <FieldArray
              name="custom_fields_attributes"
              render={() => (
                <>
                  {customFieldTypes.map((customFieldType, index) => {
                    return (
                      <CustomFieldValue
                        key={customFieldType.id}
                        customFieldType={customFieldType}
                        index={index}
                      />
                    );
                  })}
                </>
              )}
            />
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
