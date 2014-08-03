class OrganizationsController < ApplicationController
  before_action :set_organization, only: [:show, :edit, :update]
  before_action :logged_in?, only: [:show, :edit, :update]

  def show
    # check if current organization if equal to @organization
  end

  def new
    @organization = Organization.new
  end

  def create
    @organization = Organization.new(organization_params)

    confirmation_token = UUID.new.generate
    @organization.password = confirmation_token
    @organization.password_confirmation = confirmation_token
    @organization.account_confirmation_token = confirmation_token

    if @organization.save
      

      AccountConfirmationMailer.confirm_account(@organization).deliver

      flash[:success] = "Please check your email to confirm you account and set your password"
      # session[:organization_id] = @organization.id
      # flash[:success] = "Your organization was created successfully"
      # redirect_to organization_path(@organization)
      redirect_to root_url

    else
      flash.now.alert = "Apologies. Your Organization has not been registered."
      render 'new'
    end
  end

  def edit
  end

  def update
    if @organization.update(organization_params)
      redirect_to organization_path(@organization)
      flash[:success] = "Your organization was updated successfully"
    else
      flash[:alert] = "Aplogies. You Organization has not been updated."
      render 'edit'
    end
  end

  private

  def organization_params
    params.require(:organization).permit(:name, :street, :city, :state, :zipcode, :email, :phone, :description, :password, :password_confirmation, :url)
  end

  def set_organization
    @organization = Organization.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    flash.now.alert = "The Organization you were looking for could not be found."
  end

  def logged_in?
    if organization_logged_in?
      unless current_organization.id == params[:id].to_i
        redirect_to organization_path(current_organization.id)
      end
    else
      redirect_to organizations_login_path
    end
  end

end
