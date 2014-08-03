class AccountConfirmationMailer < ActionMailer::Base
  default from: "from@example.com"

  def confirm_account(user)
    @user = user
    mail(to: @user.email, subject: "[SmartSOS] Confirm Account")
  end
end
