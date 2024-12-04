class CreateBuildings < ActiveRecord::Migration[7.2]
  def change
    create_table :buildings do |t|
      t.string :address
      t.references :client, null: false, index: true, foreign_key: true

      t.timestamps
    end
  end
end
