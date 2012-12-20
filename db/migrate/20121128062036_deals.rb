class Deals < ActiveRecord::Migration
  def up
    sql = "CREATE TABLE deals (
            id                                    serial primary key,
            deal_type_id                          integer not null references deal_types(id),
            billed_customer_id                    integer not null references customers(id),
            billed_customer_attention             varchar(255),
            purchaser_customer_id                 integer not null references customers(id),
            purchaser_attention                   varchar(255),
            primary_broker_id                     integer not null references users(id),
            property_id                           integer not null references properties(id),
            type_of_use                           varchar(512),
            term                                  integer,
            start_date                            date,
            annual_rent                           numeric(10,2),
            sale_price                            numeric(10,2),
            security                              numeric(10,2),
            attorney                              varchar(255),
            notes                                 text,
            kda_sign                              boolean default false,
            kda_exclusive                         boolean default false,
            advertise_type                        varchar(255),
            customer_referred_type                varchar(255),
            listing_age                           integer,
            option_count                          integer,
            option_start_date                     date,
            late_charge                           integer,
            grace_period                          integer,
            created_at                            timestamp not null default now(),
            updated_at                            timestamp not null default now()
          )"

    execute sql

    add_index :deals, :deal_type_id
    add_index :deals, :billed_customer_id
    add_index :deals, :target_customer_id
    add_index :deals, :primary_broker_id
    add_index :deals, :property_id
  end

  def down
    drop_table :deals
  end
end
