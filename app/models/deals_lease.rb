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
    lease_deal.annual_rent_price = params['propertyInfo']['annualRentalPrice']
    lease_deal.type_of_use = params['propertyInfo']['buyerUse']
    lease_deal.term_of_lease = params['propertyInfo']['termOfLease']
    lease_deal.start_date = params['propertyInfo']['start_date']
    lease_deal.security = params['propertyInfo']['security']
    lease_deal.late_charge_percent = params['options']['lateChargePercent']
    lease_deal.late_charge_grace_period = params['options']['lateChargeGracePeriod']
    lease_deal.save!

    DealsMarketingData.create_with_params!(deal_id, params['marketing'])
    PaymentSchedule.create_with_params!(deal_id, params['paymentSchedule'])
    DealsBroker.create_with_params!(deal_id, params['otherBrokers']) if params['otherBrokers'] 
    DealsCoBrokerage.create_with_params!(deal_id, {'coBroker' => params['coBroker'], 'coBrokerPer'=> params['coBrokerPer']}) if params['coBroker'] 
    LeaseOption.create_with_params!(deal_id, params['options']) if params['options']
    DealsLateCharge.create_with_params!(deal_id, params['lateCharge']) if params['lateCharge']
    lease_deal

  end
end
