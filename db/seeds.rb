# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

["Fitswilliams", "Melody", "Jupiter", "Cross-legged Maverick", "Monarch"].each do |name|
  Client.find_or_create_by!(name: name)
end

Client.first.tap do |client|
  house_color = client.custom_field_types.find_or_create_by!(name: "house color", value_type: "freeform")
  mailbox_color = client.custom_field_types.find_or_create_by!(name: "mailbox color", value_type: "categorical", allowed_values: ["red", "green", "blue", ""])

  client.buildings.find_or_create_by!(address: "123 Ocean Parkway").tap do |building|
    building.custom_fields.find_or_create_by!(custom_field_type: house_color, field_value: "a mix of pink and muave")
  end


  client.buildings.find_or_create_by!(address: "456 Caton Avenue").tap do |building|
    building.custom_fields.find_or_create_by!(custom_field_type: mailbox_color, field_value: "red")
  end
end

Client.second.tap do |client|
  bathroom_color = client.custom_field_types.find_or_create_by!(name: "bathroom color", value_type: "categorical", allowed_values: ["red", "green", "blue", ""])
  urbanicity = client.custom_field_types.find_or_create_by!(name: "region", value_type: "categorical", allowed_values: ["urban", "suburban", "rural", ""])
  num_bathrooms = client.custom_field_types.find_or_create_by!(name: "number of bathrooms", value_type: "number")

  client.buildings.find_or_create_by!(address: "789 Flatbush Avenue").tap do |building|
    building.custom_fields.find_or_create_by!(custom_field_type: bathroom_color, field_value: "green")
    building.custom_fields.find_or_create_by!(custom_field_type: urbanicity, field_value: "urban")
  end

  client.buildings.find_or_create_by!(address: "1011 Nostrand Avenue").tap do |building|
    building.custom_fields.find_or_create_by!(custom_field_type: num_bathrooms, field_value: "3.5")
    building.custom_fields.find_or_create_by!(custom_field_type: urbanicity, field_value: "suburban")
  end
end

Client.third.tap do |client|
  ceiling_height = client.custom_field_types.find_or_create_by!(name: "ceiling height", value_type: "number")
  good_or_bad = client.custom_field_types.find_or_create_by!(name: "good or bad", value_type: "categorical", allowed_values: ["good", "bad", ""])

  client.buildings.find_or_create_by!(address: "1213 Bedford Avenue").tap do |building|
    building.custom_fields.find_or_create_by!(custom_field_type: ceiling_height, field_value: "8.5")
    building.custom_fields.find_or_create_by!(custom_field_type: good_or_bad, field_value: "good")
  end
end

Client.fourth.tap do |client|
  num_bedrooms = client.custom_field_types.find_or_create_by!(name: "number of bedrooms", value_type: "number")
  num_bathrooms = client.custom_field_types.find_or_create_by!(name: "number of bathrooms", value_type: "number")

  client.buildings.find_or_create_by!(address: "1415 Church Avenue").tap do |building|
    building.custom_fields.find_or_create_by!(custom_field_type: num_bedrooms, field_value: "2")
    building.custom_fields.find_or_create_by!(custom_field_type: num_bathrooms, field_value: "1.5")
  end
end

Client.fifth.tap do |client|
  num_bedrooms = client.custom_field_types.find_or_create_by!(name: "number of bedrooms", value_type: "number")
  num_bathrooms = client.custom_field_types.find_or_create_by!(name: "number of bathrooms", value_type: "number")

  client.buildings.find_or_create_by!(address: "1617 Cortelyou Road").tap do |building|
    building.custom_fields.find_or_create_by!(custom_field_type: num_bedrooms, field_value: "3.5")
    building.custom_fields.find_or_create_by!(custom_field_type: num_bathrooms, field_value: "2")
  end
end
