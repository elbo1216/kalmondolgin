class Customer < ActiveRecord::Base


  def Customer.get_customers_by_name(name)
    arr = name.chomp.split(' ')
    conditions = []
    if arr.size > 1
      conditions = ['lower(first_name) = ? and lower(last_name) = ?', arr[0].downcase, arr[1].downcase]  
    else
      conditions = ['lower(first_name) = ? or lower(last_name) = ?', name.downcase, name.downcase]
    end
    Customer.find(:all, :conditions => conditions)
  end

  def Customer.create_with_params!(params, created_by)
    customer = Customer.new
    customer.first_name = params['first_name']
    customer.last_name = params['last_name']
    customer.company = params['company']
    customer.street_line1 = params['street_line1']
    customer.street_line2 = params['street_line2']
    customer.city = params['city']
    customer.state = params['state']
    customer.zip = params['zip']
    customer.country = params['country']
    customer.created_by_id = created_by.id
    customer.save!
    customer
  end
end
