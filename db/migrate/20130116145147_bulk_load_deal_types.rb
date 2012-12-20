class BulkLoadDealTypes < ActiveRecord::Migration
  def up
    sql = "INSERT INTO deal_types (key, name) values ('sale', 'Sale');"
    execute sql
    sql =  "INSERT INTO deal_types (key, name) values ('lease', 'Lease');"
    execute sql
    sql =  "INSERT INTO deal_types (key, name) values ('appraisal', 'Appraisal');"
    execute sql
    sql =  "INSERT INTO deal_types (key, name) values ('tax_protest', 'Tax Protest');"
    execute sql
  end

  def down
    sql = 'TRUNCATE TABLE deal_types'
    execute sql
  end
end
