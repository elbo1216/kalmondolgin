class PaymentSchedule < ActiveRecord::Migration
  def up
    sql = "CREATE TABLE payment_schedules (
             id             serial primary key,
             deal_id        integer not null references deals(id),
             amount         numeric(10,2) not null,
             due_date       date not null,
             is_paid        boolean not null default false,
             created_at     not null default now(),
             updated_at     not null default now()
          )"
  
    execute sql

    add_index :payment_schedules, :deal_id
    add_index :payment_schedules, :due_date
  end

  def down
    drop_table :payment_schedules
  end
end
