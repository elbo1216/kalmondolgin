class DealsSale < ActiveRecord::Base
  belongs_to :customer, :foreign_key => 'purchase_customer_id'
  belongs_to :property
  belongs_to :deal

  def DealsSale.create_deal!(deal_id, params, created_by)
    sale_deal = DealsSale.new
    sale_deal.deal_id = deal_id
    sale_deal.property_id = params['propertyInfo']['propertyId'] || Property.create_new_property(params['propertyInfo']).id
    sale_deal.purchaser_customer_id = params['purchaserCustomer']['customerId'] || Customer.create_with_params!(params['purchaserCustomer'], created_by).id
    sale_deal.purchaser_attention = params['purchaserCustomer']['attention']
    sale_deal.sale_price = params['propertyInfo']['salePrice']
    sale_deal.type_of_use = params['propertyInfo']['buyerUse']
    sale_deal.attorney = params['propertyInfo']['attorney']
    sale_deal.save!

    DealsMarketingData.create_with_params!(deal_id, params['marketing'])
    PaymentSchedule.create_with_params!(deal_id, params['paymentSchedule'])
    DealsBroker.create_with_params!(deal_id, params['otherBrokers']) if params['otherBrokers'] 
    DealsCoBrokerage.create_with_params!(deal_id, {'coBroker' => params['coBroker'], 'coBrokerPer'=> params['coBrokerPer']}) if params['coBroker'] 
    sale_deal
  end
end
