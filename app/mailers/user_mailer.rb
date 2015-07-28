class UserMailer < ApplicationMailer
  
  def account_activations(user)
    @user = user
    mail to: @user.email, subject: "Welcome to Golf.com"
  end
  
end
