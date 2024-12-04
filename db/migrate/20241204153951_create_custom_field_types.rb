class CreateCustomFieldTypes < ActiveRecord::Migration[7.2]
  def change
    create_table :custom_field_types do |t|
      t.string :name, null: false
      t.string :value_type, null: false
      t.string :allowed_values, array: true, default: []
      t.references :client, null: false, index: true, foreign_key: true

      t.timestamps
    end

    add_index :custom_field_types, [:name, :client_id], unique: true
  end
end
