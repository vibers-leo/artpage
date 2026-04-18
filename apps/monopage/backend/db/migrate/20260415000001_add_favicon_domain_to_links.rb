class AddFaviconDomainToLinks < ActiveRecord::Migration[8.0]
  def change
    add_column :links, :favicon, :string unless column_exists?(:links, :favicon)
    add_column :links, :domain, :string unless column_exists?(:links, :domain)
  end
end
