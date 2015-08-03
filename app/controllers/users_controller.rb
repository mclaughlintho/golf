class UsersController < ApplicationController
  before_action :correct_user, only: [:update]
  
  def show
    @user = User.find(params[:id])
    @round = @user.rounds.new
  end
  
  def create
    @user = User.create(user_params)
    if @user.save
      UserMailer.account_activations(@user).deliver_now
    end
    redirect_to sign_in_path
  end
  
  def edit
  end
  
  def update
  end
  
  def index
  end
  
  private
  
  def send_weekly_update(user)
    UserMailer.weekly_updates(user).deliver_later(wait_until: Date.beginning_of_week)
  end
  
  def user_params
    params.require(:user).permit(:email, :password)
  end
  
  def correct_user
    if current_user != User.find(params[:id])
      redirect_to root_url
    end
  end
  
end
