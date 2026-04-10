class CreatePortfolioItems < ActiveRecord::Migration[8.1]
  def change
    create_table :portfolio_items do |t|
      t.references :profile, null: false, foreign_key: true
      t.string :image_url, null: false
      t.string :title
      t.text :description
      t.string :category
      t.integer :position, default: 0
      t.timestamps
    end
  end
end
