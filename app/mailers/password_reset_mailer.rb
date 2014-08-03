class PasswordResetMailer < ActionMailer::Base
  default from: "from@example.com"

  def reset_link(user)
    @user = user
    mail(to: @user.email, subject: "[SmartSOS] Password Reset Request")
  end
end
