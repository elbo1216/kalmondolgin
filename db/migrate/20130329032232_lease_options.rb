class LeaseOptions < ActiveRecord::Migration
  def up
    sql = "CREATE TABLE lease_options (
      id                                    serial primary key,
      deal_id                               integer references deals(id),
      option_count                          integer not null,
      begin_date                            date not null,
      option_notification_for_broker        integer,
      created_at                            timestamp not null default now(),
      updated_at                            timestamp not null default now()
    )"

    execute sql

    add_index :lease_options, :deal_id
  end

  def down
    sql = "DROP TABLE lease_options CASCADE"
    execute sql
  end
end
