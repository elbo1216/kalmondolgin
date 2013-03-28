class DealsSaleDataset < ActiveRecord::Migration
  def up
    sql = "CREATE TABLE deals_sales (
      id                                    serial primary key,
      deal_id                               integer references deals(id),
      property_id                           integer not null references properties(id),
      purchaser_customer_id                 integer not null references customers(id),
      purchaser_attention                   varchar(255),
      sale_price                            numeric(10,2) not null,
      type_of_use                           varchar(512),
      attorney                              varchar(255),
      created_at                            timestamp not null default now(),
      updated_at                            timestamp not null default now()
    )"
    execute sql

    add_index :deals_sales, :deal_id
    add_index :deals_sales, :property_id
    add_index :deals_sales, :purchaser_customer_id
  end

  def down
    sql = "DROP TABLE deals_sales CASCADE"
    execute sql
  end
end
