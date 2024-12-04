class CustomFieldType < ApplicationRecord
  belongs_to :client

  validates :name, :value_type, presence: true
  validates :allowed_values, presence: true, if: -> { value_type == "enum" }
  validates :name, uniqueness: { scope: :client_id }
  validates :value_type, inclusion: { in: %w[freeform number enum] }
end
