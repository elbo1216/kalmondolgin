class UsStates < ActiveRecord::Migration
  def up
    sql = "CREATE TABLE us_states (
            id         serial primary key,
            code       varchar(2) not null,
            name       varchar(255) not null
          )"
    execute sql
  end

  def down
    drop_table :us_states
  end
end
