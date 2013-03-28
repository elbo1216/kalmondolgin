class LeaseOption < ActiveRecord::Base
  belongs_to :deal

  def LeaseOption.create_with_params!(deal_id, params)
    option = LeaseOption.new
    option.deal_id = deal_id
    option.option_count = params['optionCount']
    option.begin_date = params['beginDate']
    option.save!
    option
  end
end
