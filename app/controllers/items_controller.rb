class ItemsController < ApplicationController
	def create
		@item = Item.new(name: params[:name]

		if @item.save
		else
			flash.now.alert = "Apologies. Your item was not created."
		end
	end
end
