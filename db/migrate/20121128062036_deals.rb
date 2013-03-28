class Deals < ActiveRecord::Migration
  def up
    sql = "CREATE TABLE deals (
            id                                    serial primary key,
            deal_type_id                          integer not null references deal_types(id),
            billed_customer_id                    integer not null references customers(id),
            billed_customer_attention             varchar(255),
            primary_broker_id                     integer not null references users(id),
            comments                              text,
            total_due_to_KDA                      numeric(8,2) not null,
            created_by_id                         integer not null references users(id),
            created_at                            timestamp not null default now(),
            updated_at                            timestamp not null default now()
          )"

    execute sql

    add_index :deals, :deal_type_id
    add_index :deals, :billed_customer_id
    add_index :deals, :primary_broker_id
    add_index :deals, :created_by_id
  end

  def down
    sql = "DROP TABLE deals CASCADE"
    execute sql
  end
end
