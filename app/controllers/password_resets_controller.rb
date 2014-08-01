class PasswordResetsController < ApplicationController
  def new
  end

  def create
    params.require(:email)

    if org = Organization.find_by_email(params[:email])
      org.update_attribute(:password_reset_token, UUID.new.generate)
  end
end
