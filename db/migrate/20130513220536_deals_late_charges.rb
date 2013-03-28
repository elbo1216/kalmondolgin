class DealsLateCharges < ActiveRecord::Migration
  def up
    sql = "CREATE TABLE deals_late_charges(
      id                                    serial primary key,
      deal_id                               integer references deals(id),
      percent                               integer,
      grace_period                          integer,
      created_at                            timestamp not null default now(),
      updated_at                            timestamp not null default now()
    )"

    execute sql

    add_index :deals_late_charges, :deal_id
  end

  def down
    sql = "DROP TABLE deals_late_charges CASCADE"
    execute sql
  end
end
