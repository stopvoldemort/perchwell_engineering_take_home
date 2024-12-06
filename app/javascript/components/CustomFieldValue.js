import React from "react";
import { Field } from "formik";

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

export const CustomFieldValue = ({
  customFieldAttributes,
  customFieldType,
  index,
}) => {
  const fieldValueName = `custom_fields_attributes.${index}.field_value`;

  return (
    <div style={{ border: "1px solid lightblack" }}>
      <label htmlFor={fieldValueName}>{customFieldType.name}</label>
      <Field
        type="hidden"
        name={`custom_fields_attributes.${index}.custom_field_type_id`}
      />
      <Field type="hidden" name={`custom_fields_attributes.${index}.id`} />
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
