class AddPasswordResetTokenToOrganizations < ActiveRecord::Migration
  def change
    add_column :organizations, :password_reset_token, :string
  end
end
