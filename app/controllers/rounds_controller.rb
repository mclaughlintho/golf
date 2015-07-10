class RoundsController < ApplicationController
  
  def create
    @round = Round.create(round_params)
    redirect_to @round.user
  end
  
  def delete
  end
  
  def index
    @rounds = Round.all
  end
  
  private
  
  def round_params
    params.require(:round).permit(:holes, :course, :par, :score, :comments, :drinking, :difficulty, :date).merge(user_id: current_user.id)
  end
  
end
