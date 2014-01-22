class DealsController < ApplicationController
  layout 'frame'

  def index
    redirect_to "/deals/sale"
  end

  def search
    @partial = "search_form"
    @deal_type_options = DealType.all.map {|dt| [dt.name, dt.id] }
    @deal_type = params['deal_type'] || 1
    if request.post?
      @deal_id = params['deal_id']
      conditions = "deal_type_id = #{@deal_type} "
      conditions << "and deal_id = #{@deal_id}" unless @deal_id.blank?
      @deal = Deal.find(:all, :include => [:deal_type, :billed_customer, :primary_broker], :conditions => conditions)
    end
    render "index"
  end

  def sale
    @broker_list = User.get_broker_list
    @broker_option_list = User.get_broker_list.map {|b| [b['name'], b['id']] }.unshift(["--Select--", ''])
    @partial = "sale_form"
    render "index"
  end

  def create_sale
    render :json => "true"
  end

  def lease
    @broker_list = User.get_broker_list
    @broker_option_list = User.get_broker_list.map {|b| [b['name'], b['id']] }.unshift(["--Select--", ''])
    @partial = "lease_form"
    render "index"
  end

  def appraisal
    @broker_list = User.get_broker_list
    @broker_option_list = User.get_broker_list.map {|b| [b['name'], b['id']] }.unshift(["--Select--", ''])
    @partial = "appraisal_form"
    render "index"
  end

  def tax_protest
    @broker_list = User.get_broker_list
    @broker_option_list = User.get_broker_list.map {|b| [b['name'], b['id']] }.unshift(["--Select--", ''])
    @partial = "tax_protest_form"
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
    ret = {'success' => true, 'errors' => [], 'dealId' => ''}

    begin
      deal = Deal.create_deal!(params, current_user)
      ret['dealId'] = deal.id
    rescue Exception => e
      logger.error e
      logger.error e.backtrace.join("\n")
      ret['success'] = false
      ret['errors'] << e.message
    end

    render :json => ret
  end
end
