class DealsOtherBrokers < ActiveRecord::Migration
  def up
    sql = "CREATE TABLE deals_brokers (
            id                                   serial primary key,
            deal_id                              integer not null references deals(id),
            broker_id                            integer not null references users(id),
            created_at                           timestamp not null default now(),
            updated_at                           timestamp not null default now()
          )"

    execute sql

    add_index :deals_brokers, :deal_id
    add_index :deals_brokers, :broker_id
  end

  def down
    sql = "DROP TABLE deals_brokers CASCADE" 
    execute sql
  end
end
