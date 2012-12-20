class Country < ActiveRecord::Base
  set_table_name 'countries'

  def Country.get_all_countries
    Country.all(:select => "iso_code, name").map {|c| { 'key' => c.iso_code, 'name' => c.name} }
  end
end
