class USState < ActiveRecord::Base
  set_table_name 'us_states'

  def USState.get_all_states
    USState.all(:select => "id, name").map {|u| {"name" => u.name, "id" => u.id} }
  end
end
