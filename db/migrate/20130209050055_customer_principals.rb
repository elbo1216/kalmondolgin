class CustomerPrincipals < ActiveRecord::Migration
  def up
    sql = "CREATE TABLE customer_principals (
             id                serial primary key,
             customer_id       integer references customers(id) not null,
             deal_id           integer references deals(id) not null,
             principal_name    varchar(255) not null,
             principal_email   varchar(255),
             principal_phone   varchar(15),
             created_at        timestamp not null default now(),
             updated_at        timestamp not null default now()
          )"
    execute sql
  end

  def down
    drop_table :customer_principals
  end
end
