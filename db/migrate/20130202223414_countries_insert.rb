class CountriesInsert < ActiveRecord::Migration
  def up
    sql = "INSERT INTO countries (iso_code, name) VALUES ('usa', 'USA')"
    execute sql
  end

  def down
    sql = "DELETE FROM countries where iso_code = 'usa'"
    execute sql
  end
end
