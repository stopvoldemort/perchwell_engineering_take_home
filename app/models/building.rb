class Building < ApplicationRecord
  belongs_to :client
  has_many :custom_fields, dependent: :destroy

  validates_associated :custom_fields
end
