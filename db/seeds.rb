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

["123 Ocean Parkway", "456 Caton Avenue", "789 Church Avenue", "1011 East 8th Street", "1213 Westminster Road"].each do |address|
  client = Client.all.sample
  client.buildings.find_by(address: address) || client.buildings.create!(address: address)
end

[
  {name: "house color", value_type: "freeform"},
  {name: "number of bedrooms", value_type: "number"},
  {name: "number of bathrooms", value_type: "number"},
  {name: "mailbox color", value_type: "enum", allowed_values: ["red", "green", "blue"]},
  {name: "region", value_type: "enum", allowed_values: ["urban", "suburban", "rural"]},
].each do |custom_field_type|
  client = Client.all.sample
  client.custom_field_types.find_by(name: custom_field_type[:name]) || client.custom_field_types.create!(custom_field_type)
end
