class PasswordResetsController < ApplicationController
  def new
  end

  def create
    params.require(:email)

    if org = Organization.find_by_email(params[:email])
      org.update_attributes(
        :password_reset_token => UUID.new.generate,
        :reset_token_expires_at => Time.now + 30.minutes
      )
      PasswordResetMailer.reset_link(org).deliver
    end

    flash[:notice] = "Check your email for password reset instructions"

    redirect_to root_path
  end

  def edit 
    @org = Organization.find_by_password_reset_token(params[:id]) 
    unless @org || @org.reset_token_expires_at < Time.now
      flash[:error] = "Sorry but your password reset appears to have been used or has expired"
      redirect_to root_path
    end
  end

  def update
    @org = Organization.find_by_password_reset_token(params[:id])
    @org.password = params[:password]
    @org.password_confirmation = params[:password_confirmation]
    if Time.now > @org.reset_token_expires_at
      flash[:error] = "Your password reset has expired. Please request a password reset again."
      redirect_to new_password_reset_path
    elsif @org.save
      flash[:notice] = "Check your email for password reset instructions"
      redirect_to root_path
    else
      flash[:error] = "There was a problem with your password. Please try again."
      render :edit
    end
  end
end
