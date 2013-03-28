class DealsTaxProtest < ActiveRecord::Base
  belongs_to :deal

  def DealsTaxProtest.create_deal!(deal_id, params, user)
  end
end
