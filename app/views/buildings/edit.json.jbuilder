json.building do |json|
  json.id @building.id
  json.address @building.address
  json.client_id @building.client_id
  json.custom_fields_attributes @building.custom_fields do |custom_field|
    json.id custom_field.id
    json.custom_field_type_id custom_field.custom_field_type_id
    json.field_value custom_field.field_value
  end
end

json.custom_field_types @building.client.custom_field_types do |custom_field_type|
  json.id custom_field_type.id
  json.name custom_field_type.name
  json.client_id custom_field_type.client_id
  json.value_type custom_field_type.value_type
  json.allowed_values custom_field_type.allowed_values
end