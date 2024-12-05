class Building < ApplicationRecord
  belongs_to :client
  has_many :custom_fields, dependent: :destroy

  validates_associated :custom_fields
  accepts_nested_attributes_for :custom_fields
end
