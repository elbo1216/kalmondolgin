class PaymentSchedule < ActiveRecord::Base
  belongs_to :deal

  def PaymentSchedule.create_with_params!(deal_id, periods)
    list = []
    periods.each do |index, sched|
      ps = PaymentSchedule.new
      ps.deal_id = deal_id
      ps.due_date = sched['paymentDate']
      ps.amount_due = sched['paymentDue']
      ps.save!
      list << ps
    end
    list
  end
end
