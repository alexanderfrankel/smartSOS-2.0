require 'spec_helper'

describe "Account Confirmation" do
  it "sends a confirmation email on organization signup, it contains a link to confirm the account and create a password. Organization enters their password and is redirected to organization root" do
    
    ActionMailer::Base.deliveries.clear

    email = "foo@bar.com"

    visit "/"
    click_on "I'm an Organization"
    click_on "Register New Organization"

    within('.organization-form') do
      fill_in 'Name', with: 'FooOrg'
      fill_in 'Description', with: 'a foo org'
      fill_in 'Address', with: '555 fooooooo'
      fill_in 'City', with: 'Foo Town'
      fill_in 'State', with: 'AK'
      fill_in 'Zip', with: 20011
      fill_in 'Phone', with: 555-555-5555
      fill_in 'Email', with: 'foo@foo.com'
      # fill_in 'Password', with: 'foofoo'
      # fill_in 'Password Confirmation', with: 'foofoo'
      fill_in 'Website URL', with: 'fooorg.com'
    end

    click_on 'Register Organization'

    org = Organization.find_by(email: 'foo@foo.com')

    expect(current_url).to eq root_url

    expect(ActionMailer::Base.deliveries.count).to eq 1 
    email = ActionMailer::Base.deliveries.first

    expect(email.body).to include confirm_account_path(org.account_confirmation_token)

    visit edit_confirm_account_path(org.account_confirmation_token)
    password = 'foofoo'
    fill_in 'Password', with: password
    fill_in :password_confirmation , with: password
    click_on 'Submit'

    expect(current_url).to eq organizations_login_url

    fill_in 'Email', with: org.email
    fill_in 'Password', with: password
    click_on 'Login'

    expect(current_path).to eq organization_path(org)



  end
end