class ApplicationController < ActionController::Base
  helper_method :current_donor, :donor_logged_in?, :current_organization, :organization_logged_in?
  protect_from_forgery with: :exception

  def current_donor
    @current_donor ||= session[:donor_id] && Donor.find(session[:donor_id])
  end

  def donor_logged_in?
    current_donor != nil
  end

  def current_organization
    @current_organization ||= session[:organization_id] && Organization.find(session[:organization_id])
  end

  def organization_logged_in?
    current_organization != nil
  end
end