class CreateCustomFields < ActiveRecord::Migration[7.2]
  def change
    create_table :custom_fields do |t|
      t.string :field_value, null: false
      t.references :custom_field_type, null: false, index: true, foreign_key: true
      t.references :building, null: false, index: true, foreign_key: true

      t.timestamps
    end
  end
end
