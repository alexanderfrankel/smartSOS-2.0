class AddAccountConfirmationTokenToOrganization < ActiveRecord::Migration
  def change
    add_column :organizations, :account_confirmation_token, :string
  end
end
