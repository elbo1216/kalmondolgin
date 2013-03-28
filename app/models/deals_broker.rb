class DealsBroker < ActiveRecord::Base
  belongs_to :deal
  
  def DealsBroker.create_with_params!(deal_id, brokers)
    list = []
    brokers.each do |ob|
      db = DealsBroker.new
      db.deal_id = deal_id
      db.broker_id = ob
      db.save!
      list << db
    end
    list
  end
end
