class CreateItems < ActiveRecord::Migration
  def change
    create_table :items do |t|
      t.string :asin
      t.string :name
      t.string :category
      t.string :img_url
      t.integer :price, :default => 0 # stored as cents
			t.boolean :amazon_item?

      t.timestamps
    end
  end
end
