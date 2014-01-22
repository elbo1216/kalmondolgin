class DealsMarketingData < ActiveRecord::Base
  belongs_to :deal

  def DealsMarketingData.create_with_params!(deal_id, params)
    dmd = DealsMarketingData.new
    dmd.deal_id = deal_id
    dmd.sign_on_building = true if params['kdaSign'] == 'yes'
    dmd.kda_exclusive = true if params['kdaExclusive'] == 'yes'
    dmd.advertise_type = params['advertiseType']
    dmd.buyer_referral_type = params['buyerFind']
    dmd.listing_period = params['marketDays']
    dmd.save!
    dmd
  end
end
