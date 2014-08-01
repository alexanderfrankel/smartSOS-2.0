class PasswordResetsController < ApplicationController
  def new
  end

  def create
    params.require(:email)

    if org = Organization.find_by_email(params[:email])
      org.update_attribute(:password_reset_token, UUID.new.generate)
      PasswordResetMailer.reset_link(org).deliver
    end

    redirect_to root_path
  end
end
