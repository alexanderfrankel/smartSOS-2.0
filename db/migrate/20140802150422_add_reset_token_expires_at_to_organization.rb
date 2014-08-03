class AddResetTokenExpiresAtToOrganization < ActiveRecord::Migration
  def change
    add_column :organizations, :reset_token_expires_at, :datetime
  end
end
