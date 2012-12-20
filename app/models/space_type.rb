class SpaceType < ActiveRecord::Base

  has_many :properties

  def SpaceType.get_all_space_types
    SpaceType.all(:select => 'key, name').map { |s| { 'code' => s.key, 'name' => s.name} }
  end

end
