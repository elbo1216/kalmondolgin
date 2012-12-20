class Deal < ActiveRecord::Base
  belongs_to :customer, :foreign_key => 'billed_customer_id'
  belongs_to :customer, :foreign_key => 'target_customer_id'
  belongs_to :user, :foreign_key => 'primary_broker_id'
  belongs_to :property
  belongs_to :deal_type
  
end
