class Property < ActiveRecord::Base
  belongs_to :space_type

  def Property.get_properties(params)
    conditions = []
    conditions << "state = '#{params['state']}'" unless params['state'].blank?
    conditions << "city = '#{params['city']}'" unless params['city'].blank?
    conditions << "zip = '#{params['zip']}'" unless params['zip'].blank?
    conditions << "street_line1 = '#{params['address']}'" unless params['address'].blank?

    Property.find(:all, :include => :space_type, :conditions => conditions.join(' and '))
  end

  def Property.create_with_params!(params)
    property = Property.new
    property.street_line1 = params['street_line1']
    property.street_line2 = params['street_line2']
    property.city = params['city']
    property.state = params['state']
    property.zip = params['zip']
    property.country = params['country']
    property.size = params['size']
    property.save!
  end
end
