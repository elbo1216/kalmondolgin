class DealsController < ApplicationController
  layout 'frame'

  def index
    redirect_to "/deals/sale"
  end

  def search
    @partial = "search_form"
    render "index"
  end

  def sale
    @partial = "sale_form"
    @form_label = "Sale"
    @show_extra_broker_info = true

    render "index"
  end

  def create_sale
    render :json => "true"
  end

  def lease
    @partial = "lease_form"
    @form_label = "Lease"
    @show_extra_broker_info = true
    render "index"
  end

  def appraisal
    @partial = "appraisal_form"
    @form_label = "Appraisal"
    @show_extra_broker_info = false
    render "index"
  end

  def tax_protest
    @partial = "tax_protest_form"
    @form_label = "Tax Protest"
    @show_extra_broker_info = false
    render "index"
  end

  def get_all_brokers
    users = User.get_broker_list
    render :json => users
  end

  def get_states
    render :json => USState.get_all_states
  end

  def get_all_countries
    render :json => Country.get_all_countries
  end

  def get_all_space_types
    render :json => SpaceType.get_all_space_types
  end

  def get_customers
    render :json => Customer.get_customers_by_name(params['customer_name'])
  end

  def get_properties
    property = Property.get_properties(params)
    render :json => property.map { |prop| { 'space_type' => prop.space_type.name }.merge(prop.attributes) }
  end

  def submit
    deal = Deal.new   
    bill_customer = params['billCustomer']['id'] || Customer.create_with_params!(params['billCustomer']).id
    purchaser_customer = params['purchaserCustomer']['id'] || Customer.create_with_params!(params['billCustomer']).id
    property_id= params['propertyInfo']['id'] || create_new_property(params['propertyInfo']).id
    primary_broker_id = params['mainBroker']

    deal.billed_customer_id = bill_customer unless bill_customer.blank?
    deal.target_customer_id = target_customer unless target_customer.blank?
    deal.property_id = property_id unless property_id.blank?
    deal.primary_broker_id = primary_broker_id || current_user.id
      
    render :json => {'success' => true}
  end
end
