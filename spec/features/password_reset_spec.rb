require 'spec_helper'

describe "Password reset" do
  it "sends an email to the organization user, containing the link to reset their pasword, when the organization user requests a password reset, letting the user reset their password" do
    ActionMailer::Base.deliveries.clear

    email = "foo@bar.com"
    org = FactoryGirl.create(:organization, :email => email)

    visit "/"
    click_on "I'm an Organization"
    click_on "Forgot My Password"
    fill_in :email, with: email
    click_on "Submit"

    assert_equal root_url, current_url
    
    assert_equal 1, ActionMailer::Base.deliveries.count
    email = ActionMailer::Base.deliveries.first

    org.reload
    assert email.body.to_s =~ /#{edit_password_reset_path(org.password_reset_token)}/

    visit edit_password_reset_path(org.password_reset_token)
    
    new_password = "newpassword"
    fill_in :password, with: new_password
    fill_in :password_confirmation, with: new_password

    click_on "Submit"

    assert page.body =~ /Check your email/
  end
end
