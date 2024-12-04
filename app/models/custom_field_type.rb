class CustomFieldType < ApplicationRecord
  belongs_to :client
  has_many :custom_fields

  enum value_type: { freeform: 'freeform', number: 'number', categorical: 'categorical' }

  validates :name, :value_type, presence: true
  # validates :value_type, inclusion: { in: value_type.keys }
  validates :allowed_values, presence: true, if: -> { value_type == 'categorical' }
  validates :name, uniqueness: { scope: :client_id }
end
