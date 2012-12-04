class Properties < ActiveRecord::Migration
  def up
    sql = "CREATE TABLE properties (
             id               serial primary key,
             street_line1     varchar(1024) not null,
             street_line2     varchar(1024),
             city             varchar(1024) not null,
             state            varchar(2) not null,
             country          varchar(3) not null,
             space_type_id    integer not null references space_types(id),
             size             integer,
             deleted_at       timestamp,
             created_at       timestamp not null default now(),
             updated_at       timestamp not null default now()
          )"
    execute sql

    add_index :properties, :space_type_id
  end

  def down
    drop_table :properties
  end
end
