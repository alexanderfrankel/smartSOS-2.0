class PledgesController < ApplicationController
    before_action :logged_in?

  def new
      # this is the campaign show page for donors where they can submit pledges
      @campaign = Campaign.find(params[:campaign_id])
      @pledges = @campaign.pledges.where(donor_id: current_donor)
      @requests = @campaign.requests


      @front_end_request_model = @requests.each_with_object [] do |request, front_end_model|
        front_end_model << {id: request.id,
                            asin: request.item.asin,
                            name: request.item.name,
                            quantity: request.quantity,
                            price: request.item.price_dollars,
                            url: request.item.img_url}
      end

      @request_model_data_json = @front_end_request_model.to_json.html_safe
  end

  def create
    params["pledge"].each do |key, value|
      request_id = value['request_id']
      pledge_quantity = value['quantity']
      new_request_quantity = Request.find(request_id).quantity - pledge_quantity.to_i

      Pledge.create(donor_id: current_donor.id,
                    request_id: request_id,
                    quantity: pledge_quantity )

      Request.find(request_id).update_attribute('quantity', new_request_quantity)
    end
    flash[:alert] = "Thank you for your donation."
    redirect_to root_path
  end

  private

  def pledge_params
    params.require(:pledge).permit(:quantity, :request_id)
  end

  def logged_in?
    unless donor_logged_in?
        session[:campaign_id] = params[:campaign_id]
        redirect_to donors_login_path
    end
  end

end
