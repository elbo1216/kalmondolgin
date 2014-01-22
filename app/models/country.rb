class Country < ActiveRecord::Base
  set_table_name 'countries'

  def Country.get_all_countries
    Country.all(:select => "id, name").map {|c| { 'id' => c.id, 'name' => c.name} }
  end
end
