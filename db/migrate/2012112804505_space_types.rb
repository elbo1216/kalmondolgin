class SpaceTypes < ActiveRecord::Migration
  def up
    sql = "CREATE TABLE space_types (
            id              serial primary key,
            key             varchar(255) not null,
            name            varchar(255) not null,
            description     text,
            created_at      timestamp not null default now(),
            updated_at      timestamp not null default now()
          )"

    execute sql

    add_index :space_types, :key
  end

  def down
    drop_table :space_types
  end
end
