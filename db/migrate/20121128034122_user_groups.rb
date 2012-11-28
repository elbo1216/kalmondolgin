class UserGroups < ActiveRecord::Migration
  def up
    sql = "CREATE TABLE user_groups (
            id          serial primary key,
            user_id     integer not null references users(id),
            group_id    integer not null references groups(id),
            created_at  timestamp not null default now(),
            updated_at  timestamp not null default now()
          )"
    execute sql

    add_index :user_groups, :user_id
    add_index :user_groups, :group_id
    add_index :user_groups, [:group_id, :user_id],  :unique => true
  end

  def down
    drop_table :user_groups
  end
end
