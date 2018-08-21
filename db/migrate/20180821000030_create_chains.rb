class CreateChains < ActiveRecord::Migration[5.2]
  def change
    create_table :chains do |t|
      t.integer :likes, default: 0
      t.integer :dislikes, default: 0
    end
  end
end
