import React from "react";
import { Form, Field, FieldArray } from "formik";
import { CustomFieldValue } from "./CustomFieldValue";

const BuildingForm = ({ isSubmitting, values, customFieldTypes }) => {
  return (
    <Form>
      <label htmlFor="address">Address:</label>
      <Field type="text" name="address" />
      <FieldArray
        name="custom_fields_attributes"
        render={() => (
          <>
            {values.custom_fields_attributes.map(
              (customFieldAttributes, index) => {
                const customFieldType = customFieldTypes.find(
                  (customFieldType) =>
                    customFieldType.id ===
                    customFieldAttributes.custom_field_type_id
                );
                return (
                  <CustomFieldValue
                    key={`custom-field-${index}`}
                    customFieldAttributes={customFieldAttributes}
                    customFieldType={customFieldType}
                    index={index}
                  />
                );
              }
            )}
          </>
        )}
      />
      <button type="submit" disabled={isSubmitting}>
        Submit
      </button>
    </Form>
  );
};

export default BuildingForm;
