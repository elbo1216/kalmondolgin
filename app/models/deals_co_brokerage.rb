class DealsCoBrokerage < ActiveRecord::Base
  belongs_to :deal
  
  def DealsCoBrokerage.create_with_params!(deal_id, params)
    dcb = DealsCoBrokerage.new
    dcb.deal_id = deal_id
    dcb.co_brokerage = params['coBroker']
    dcb.co_brokerage_percentage = params['coBrokerPer']
    dcb.save!
    dcb
  end
end
