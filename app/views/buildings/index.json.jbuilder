json.array! @buildings do |building|
  json.partial! 'buildings/building', building: building
end
