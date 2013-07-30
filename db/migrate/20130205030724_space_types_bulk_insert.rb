class SpaceTypesBulkInsert < ActiveRecord::Migration
  def up
    sql = "INSERT INTO space_types (key, name) values ('office', 'Office');"
    execute sql
    sql = "INSERT INTO space_types (key, name) values ('industrial_warehouse', 'Industrial/Warehouse')";
    execute sql
    sql = "INSERT INTO space_types (key, name) values ('retail', 'Retail');"
    execute sql
    sql =  "INSERT INTO space_types (key, name) values ('land_development', 'Land/Development');"
    execute sql
    sql =  "INSERT INTO space_types (key, name) values ('residential', 'Residential');"
    execute sql
    sql =  "INSERT INTO space_types (key, name) values ('medical_office', 'Medical Office');"
    execute sql
    sql =  "INSERT INTO space_types (key, name) values ('hotel', 'Hotel');"
    execute sql
  end

  def down
    sql = 'TRUNCATE TABLE space_types'
    execute sql
  end
end
