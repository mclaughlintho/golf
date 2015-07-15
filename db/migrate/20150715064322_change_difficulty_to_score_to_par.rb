class ChangeDifficultyToScoreToPar < ActiveRecord::Migration
  def change
    rename_column :rounds, :difficulty, :score_to_par
  end
end
