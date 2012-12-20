class Countries < ActiveRecord::Migration
  def up
    sql = "CREATE TABLE countries (
            id         serial primary key,
            iso_code   varchar(3) not null,
            name       varchar(255) not null,
            created_at timestamp not null default now()
          )"
    execute sql
  end

  def down
    drop_table :countries
  end
end
