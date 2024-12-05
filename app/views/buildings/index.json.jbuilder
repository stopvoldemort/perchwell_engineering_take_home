json.array! @buildings do |building|
  json.id building.id
  json.address building.address
  json.client_name building.client.name

  building.custom_fields.each do |field|
    json.set! field.custom_field_type.name, field.field_value
  end
end
