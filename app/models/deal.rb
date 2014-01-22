class Deal < ActiveRecord::Base
  belongs_to :billed_customer, :class_name => 'Customer'
  belongs_to :deal_type
  belongs_to :primary_broker, :class_name => 'User'

  has_one  :deals_sale
  has_one  :deals_lease
  has_one  :deals_appraisal
  has_one  :deals_tax_protest
  has_one  :lease_option
  has_one  :deals_marketing_data
  has_many :payment_schedule
  
  def self.create_deal!(params, user)
    Deal.transaction do
      bill_customer = params['billCustomer']['customerId'] || Customer.create_with_params!(params['billCustomer'], user).id
      deal = Deal.new   
      deal.deal_type_id = DealType.find_by_key(params['dealType']).id
      deal.primary_broker_id = params['formMetaInfo']['mainBroker']
      deal.billed_customer_id = bill_customer unless bill_customer.blank?
      deal.billed_customer_attention = params['billCustomer']['attention']
      deal.total_due_to_kda = params['formMetaInfo']['totalDueToKDA']
      deal.created_by_id = user.id
      deal.save!
        
      case params['dealType']
      when "sale"
        DealsSale.create_deal!(deal.id, params, user)
        deal.comments = params['marketingInfo']['broker_comments']
      when "lease"
        DealsLease.create_deal!(deal.id, params, user)
      when "appraisal"
        DealsAppraisal.create_deal!(deal.id, params, user)
      when "tax_protest"
        DealsTaxProtest.create_deal!(deal.id, params, user)
      else
      end
      deal
    end
  end
end
