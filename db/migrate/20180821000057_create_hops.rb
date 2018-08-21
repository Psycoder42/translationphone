class CreateHops < ActiveRecord::Migration[5.2]
  def change
    create_table :hops do |t|
      t.string :text, limit: 255
      t.string :language, limit: 7
      t.string :language_name, limit: 31
      t.integer :chain_id
      t.integer :hop_num
    end
    add_foreign_key :hops, :chains, column: :chain_id, primary_key: "id", on_delete: :cascade
  end
end
