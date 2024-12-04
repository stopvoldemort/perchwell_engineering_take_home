FactoryBot.define do
  factory :custom_field do
    field_value { "MyString" }
    custom_field_type { nil }
  end
end
