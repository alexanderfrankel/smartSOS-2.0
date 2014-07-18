class Item < ActiveRecord::Base
  has_many :requests

  # validates :asin, uniqueness:true
  validates :name, presence: true
  # validates :img_url
  # validates :price

  def price_dollars
		if self.price
			price = self.price / 100.0
			('%.2f' % price).to_f
		end
  end

  def price_dollars=(val)
    self.price = val * 100
  end
end
