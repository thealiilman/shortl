class CreateLinks < ActiveRecord::Migration[6.0]
  def change
    create_table :links do |t|
      t.text :key, null: false
      t.text :url, null: false

      t.timestamps
    end
  end
end
