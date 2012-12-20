class USState < ActiveRecord::Base
  set_table_name 'us_states'

  def USState.get_all_states
    USState.all(:select => "code, name").map {|u| {"code" => u.code, "name" => u.name} }
  end
end
