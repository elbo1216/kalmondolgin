class DealsLateCharge < ActiveRecord
  belongs_to :deal

  def DealsLateCharge.create_with_params(deal_id, params)
    charge = DealsLateCharge.new
    charge.percent = params['lateChargePercent']
    charge.grace_period
    charge.save!
    charge
  end
end
