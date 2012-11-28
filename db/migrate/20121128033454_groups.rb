class Groups < ActiveRecord::Migration
  def up
    sql = "CREATE TABLE groups (
             id            serial primary key,
             name          varchar(255),
             key           varchar(255) not null,
             description   varchar(1024),
             created_at    timestamp not null default now(),
             updated_at    timestamp not null default now()
          )"
    execute sql

    add_index :groups, :name
    add_index :groups, :key, :unique => true
  end

  def down
    drop_table :groups
  end
end
