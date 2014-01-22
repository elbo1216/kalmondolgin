class SpaceType < ActiveRecord::Base

  has_many :properties

  def SpaceType.get_all_space_types
    SpaceType.all(:select => 'id, name').map { |s| { 'id' => s.id, 'name' => s.name} }
  end

end
