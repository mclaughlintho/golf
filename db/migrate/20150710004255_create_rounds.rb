class CreateRounds < ActiveRecord::Migration
  def change
    create_table :rounds do |t|
      t.integer :holes
      t.string :course
      t.datetime :date
      t.integer :par
      t.integer :score
      t.string :comments
      t.boolean :drinking
      t.integer :difficulty

      t.timestamps null: false
    end
  end
end
