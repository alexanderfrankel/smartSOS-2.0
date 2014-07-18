class ItemsController < ApplicationController
	def create
		@item = Item.new(name: params[:item])

		if @item.save
			redirect_to new_campaign_request_path(params[:campaign_id])
		else
			flash.now.alert = "Apologies. Your item was not created."
			redirect_to new_campaign_request_path(params[:campaign_id])
		end
	end
end
