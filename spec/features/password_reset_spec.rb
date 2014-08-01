require 'spec_helper'

describe "Password reset" do
  it "sends an email to the organization user, containing the link to reset their pasword, when the organization user requests a password reset" do
    ActionMailer::Base.deliveries.clear

    visit "/"
    click_on "I'm an Organization"
    click_on "Forgot My Password"
    fill_in :email, with: "foo@bar.com"
    click_on "Submit"
    
    assert_equal 1, ActionMailer::Base.deliveries.count
    email = ActionMailer::Base.deliveries

    assert email.body.to_s =~ /#{organization_forgot_password_url}/
  end
end
