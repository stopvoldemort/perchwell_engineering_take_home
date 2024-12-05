json.custom_field_types @client.custom_field_types do |custom_field_type|
  json.id custom_field_type.id
  json.name custom_field_type.name
  json.client_id custom_field_type.client_id
  json.value_type custom_field_type.value_type
  json.allowed_values custom_field_type.allowed_values
end
