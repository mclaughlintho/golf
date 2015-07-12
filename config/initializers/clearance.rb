Clearance.configure do |config|
  config.mailer_sender = "noreply@golf.com"
  config.allow_sign_up = true
  config.cookie_domain = 'secret-retreat-3520.herokuapp.com/'
  config.cookie_expiration = lambda { |cookies| 1.year.from_now.utc }
  config.cookie_name = 'remember_token'
  config.cookie_path = '/'
  config.routes = false
  config.httponly = false
  config.password_strategy = Clearance::PasswordStrategies::BCrypt
  config.redirect_url = '/'
  config.secure_cookie = false
  config.sign_in_guards = []
  config.user_model = User
end
