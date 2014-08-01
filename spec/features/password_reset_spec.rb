require 'spec_helper'

describe "Password reset" do
  it "sends an email to the organization user, containing the link to reset their pasword, when the organization user requests a password reset" do
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
    assert email.body.to_s =~ /#{password_reset_path(org.password_reset_token)}/
  end
end
