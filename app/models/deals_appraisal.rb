class DealsAppraisal < ActiveRecord::Base
  belongs_to :deal

  def DealsAppraisal.create_deal!(deal_id, params, user)
    da = DealsAppraisal.new
    da.deal_id = deal_id
    da.work_performed = params['detailWorkPerformed']
    da.save!
    da
  end
end
