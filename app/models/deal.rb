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
  
end
