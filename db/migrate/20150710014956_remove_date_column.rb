class RemoveDateColumn < ActiveRecord::Migration
  def change
    remove_column :rounds, :date
  end
end
