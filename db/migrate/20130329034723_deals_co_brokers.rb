class DealsCoBrokers < ActiveRecord::Migration
  def up
    sql = "CREATE TABLE deals_co_brokerages (
            id                               serial primary key,
            deal_id                          integer not null references deals(id),
            co_brokerage                     varchar(255) not null,
            co_brokerage_percentage          integer not null,
            created_at                       timestamp not null default now(),
            updated_at                       timestamp not null default now()
    )"
    execute sql

    add_index :deals_co_brokerages, :deal_id
  end

  def down
    sql = "DROP TABLE deals_co_brokerages CASCADE"
    execute sql
  end
end
