class DealsLeaseDataset < ActiveRecord::Migration
  def up
    sql = "CREATE TABLE deals_leases (
      id                                    serial primary key,
      deal_id                               integer references deals(id),
      property_id                           integer not null references properties(id),
      leaser_customer_id                    integer not null references customers(id),
      leaser_attention                      varchar(255),
      annual_rent_price                     numeric(10,2) not null,
      type_of_use                           varchar(512),
      term_of_lease                         varchar(255),
      start_date                            date not null,
      security                              numeric(10,2),
      created_at                            timestamp not null default now(),
      updated_at                            timestamp not null default now()
    )"

    execute sql

    add_index :deals_leases, :deal_id
    add_index :deals_leases, :property_id
    add_index :deals_leases, :leaser_customer_id
  end

  def down
    sql = "DROP TABLE deals_leases CASCADE"
    execute sql
  end
end
