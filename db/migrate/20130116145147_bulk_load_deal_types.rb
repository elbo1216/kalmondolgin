class BulkLoadDealTypes < ActiveRecord::Migration
  def up
    sql = "INSERT INTO deal_types (key, name, table_ref) values ('sale', 'Sale', 'deals_sale');"
    execute sql
    sql =  "INSERT INTO deal_types (key, name, table_ref) values ('lease', 'Lease', 'deals_lease');"
    execute sql
    sql =  "INSERT INTO deal_types (key, name, table_ref) values ('appraisal', 'Appraisal', 'deals_appraisal');"
    execute sql
    sql =  "INSERT INTO deal_types (key, name, table_ref) values ('tax_protest', 'Tax Protest', 'deals_tax_protest');"
    execute sql
  end

  def down
    sql = 'TRUNCATE TABLE deal_types'
    execute sql
  end
end
