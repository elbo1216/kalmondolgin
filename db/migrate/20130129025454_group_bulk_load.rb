class GroupBulkLoad < ActiveRecord::Migration
  def up
    sql = "INSERT INTO groups (name, key, description) VALUES ('Administrator', 'admin', 'Adminstrator Group')"
    execute sql
    sql = "INSERT INTO groups (name, key, description) VALUES ('Brokers', 'brokers', 'Broker Group')"
    execute sql
    sql = "INSERT INTO groups (name, key, description) VALUES ('Managers', 'managers', 'Manager Group')"
    execute sql
    sql = "INSERT INTO groups (name, key, description) VALUES ('Finance', 'finance', 'Finance Group')"
    execute sql
  end

  def down
    sql = "TRUNCATE TABLE groups"
    execute sql
  end
end
