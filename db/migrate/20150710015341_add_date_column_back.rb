class AddDateColumnBack < ActiveRecord::Migration
  def change
    add_column :rounds, :date, :date
  end
end
