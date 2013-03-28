class Customers < ActiveRecord::Migration
  def up
    sql = "CREATE TABLE customers (
             id              serial primary key,
             created_by_id   integer not null references users(id),
             first_name      varchar(255) not null,
             last_name       varchar(255) not null,
             company         varchar(255),
             street_line1    varchar(1024) not null,
             street_line2    varchar(1024),
             city            varchar(255) not null,
             state           varchar(255),
             zip             varchar(50),
             country         varchar(3),
             deleted_at      timestamp,
             deleted_by      integer references users(id),
             created_at      timestamp not null default now(),
             updated_at      timestamp not null default now()
          )"
    execute sql

    add_index :customers, :created_by
  end

  def down
    drop_table :customers
  end
end
