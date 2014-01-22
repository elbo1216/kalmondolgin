class DealsLease < ActiveRecord::Base
  belongs_to :customer, :foreign_key => 'purchase_customer_id'
  belongs_to :property
  belongs_to :deal

  def DealsLease.create_deal!(deal_id, params, created_by) 

    lease_deal = DealsLease.new
    lease_deal.deal_id = deal_id
    lease_deal.property_id = params['propertyInfo']['propertyId'] || Property.create_new_property(params['propertyInfo']).id
    lease_deal.leaser_customer_id = params['purchaserCustomer']['customerId'] || Customer.create_with_params!(params['purchaserCustomer'], created_by).id
    lease_deal.leaser_attention = params['purchaserCustomer']['attention']
    lease_deal.annual_rent_price = params['propertyInfo']['price'].to_f
    lease_deal.type_of_use = params['propertyInfo']['tenantUse']
    lease_deal.term_of_lease = params['propertyInfo']['termOfLease']
    lease_deal.start_date = params['propertyInfo']['startDate']
    lease_deal.security = params['propertyInfo']['security']
    lease_deal.save!

    DealsMarketingData.create_with_params!(deal_id, params['marketing'])
    PaymentSchedule.create_with_params!(deal_id, params['paymentSchedule'])
    DealsBroker.create_with_params!(deal_id, params['formMetaInfo']['otherBrokers']) if params['formMetaInfo']['otherBrokers'] 
    DealsCoBrokerage.create_with_params!(deal_id, {'coBroker' => params['formMetaInfo']['coBroker'], 'coBrokerPer'=> params['formMetaInfo']['coBrokerPer']}) if params['formMetaInfo']['coBroker'] 
    LeaseOption.create_with_params!(deal_id, params['options']) unless params['options'].blank?
    DealsLateCharge.create_with_params!(deal_id, params['lateCharge']) unless params['lateCharge'].blank?
    lease_deal

  end
end
