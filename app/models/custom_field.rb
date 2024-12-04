class CustomField < ApplicationRecord
  belongs_to :custom_field_type
  belongs_to :building

  validates :custom_field_type, :field_value, presence: true

  validate :field_value_matches_custom_field_type

  private

  def field_value_matches_custom_field_type
    return if custom_field_type.nil?
    if custom_field_type.value_type == 'categorical'
      return if custom_field_type.allowed_values.include?(field_value)
      errors.add(:field_value, 'must be one of the allowed values')
    end
    if custom_field_type.value_type == 'number'
       # Confirms the value (which is stored as a string) can be cast to a number
      return if can_be_cast_to_a_float?(field_value)
      errors.add(:field_value, 'must be a number')
    end
  end

  def can_be_cast_to_a_float?(value)
    !ActiveModel::Type::Float.new.cast(value).nil?
  end
end
