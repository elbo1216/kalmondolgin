class DealTypes < ActiveRecord::Migration
  def up
    sql = "CREATE TABLE deal_types (
             id                      serial primary key,
             key                     varchar(255) not null,
             name                    varchar(255) not null,
             description             text,
             table_ref               text,
             created_at              timestamp not null default now(),
             updated_at              timestamp not null default now()
           )"
    execute sql
  end

  def down
    sql = "DROP TABLE deal_types CASCADE"
    execute sql
  end
end
