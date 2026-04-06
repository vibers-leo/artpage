class AddDisplayNameToProfiles < ActiveRecord::Migration[8.1]
  def change
    add_column :profiles, :display_name, :string unless column_exists?(:profiles, :display_name)
  end
end
