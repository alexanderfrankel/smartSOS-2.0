class ConfirmAccountController < ApplicationController
  def new
  end

  def edit
    @org = Organization.find_by_account_confirmation_token( params[:id]) 
    unless @org
      redirect_to root_path
    end
  end

  def update
    @org = Organization.find_by_account_confirmation_token(params[:id])
    @org.password = params[:password]
    @org.password_confirmation = params[:password_confirmation]

    if @org.save
      flash[:success] = 'Organization account created!'
      redirect_to organization_path(@org)
    else
      flash[:error] = "There was a problem with your password. Please try again."
      render :edit
    end
  end
  
end