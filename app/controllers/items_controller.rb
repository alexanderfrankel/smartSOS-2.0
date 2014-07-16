class ItemsController < ApplicationController
	def create
		@item = Item.new(name: params[:item])

		if @item.save
			redirect_to new_campaign_request_path(params[:campaign_id])
		else
			puts @item.errors
			flash.now.alert = "Apologies. Your item was not created."
		end
	end
end
