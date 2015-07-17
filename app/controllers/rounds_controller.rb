class RoundsController < ApplicationController
  before_filter :require_login, only: [:create, :destroy]
  before_filter :correct_user, only: [:create, :destroy]
  
  def create
    @round = Round.create(round_params)
    @user = User.find(params[:user_id])
    render @round
  end
  
  def destroy
    @round = Round.find(params[:id])
    @user = @round.user
    @round.destroy
    render nothing: true
  end
  
  def index
    @rounds = Round.all
  end
  
  private
  
  def round_params
    params.require(:round).permit(:holes, :course, :par, :score, :comments, :drinking, :score_to_par, :date).merge(user_id: current_user.id)
  end
  
  def correct_user
    if current_user != User.find(params[:id])
      redirect_to root_url
    end
  end
  
end
