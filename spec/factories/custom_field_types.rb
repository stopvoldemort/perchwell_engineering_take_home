FactoryBot.define do
  factory :custom_field_type do
    value_type { "MyString" }
    client { nil }
  end
end
