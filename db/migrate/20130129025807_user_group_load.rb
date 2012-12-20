class UserGroupLoad < ActiveRecord::Migration
  def up
    User.all.each do |u|
      sql = "INSERT INTO user_groups (user_id, group_id) select #{u.id}, id from groups where key = 'brokers'"
      execute sql
    end
  end

  def down
    sql = "TRUNCATE TABLE user_groups"
    execute sql
  end
end
