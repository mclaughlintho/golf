class Round < ActiveRecord::Base
  belongs_to :user
  
  def score_to_par
    if !score.nil? && !par.nil?
      (score - par)
    end
  end
end
