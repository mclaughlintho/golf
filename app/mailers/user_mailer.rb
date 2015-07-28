class UserMailer < ApplicationMailer
  
  def account_activations(user)
    @user = user
    mail to: @user.email, subject: "Welcome to Golf.com"
  end
  
  def weekly_updates(user)
    @user = user
    @rounds = @user.rounds.select { |round| round.date < 7.days.ago }
    mail to: @user.email, subject: "Your Rounds this Week"
  end
  
end
