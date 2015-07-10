class UsersController < ApplicationController
  
  def show
    @user = User.find(params[:id])
    @round = @user.rounds.new
  end
  
  def create
    @user = User.create(user_params)
    redirect_to sign_in_path
  end
  
  private
  
  def user_params
    params.require(:user).permit(:email, :password)
  end
  
end
