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
    @partial = "sale_form"
    @show_extra_broker_info = true
    @broker_option_list = User.get_broker_list.map {|b| [b['name'], b['id']] }.unshift(["--Select--", ''])
    if params['id']
      @deal = Deal.find(params['id'])
      @data = {:deal => @deal}.to_json
    end
    render "index"
  end

  def create_sale
    render :json => "true"
  end

  def lease
    @broker_option_list = User.get_broker_list.map {|b| [b['name'], b['id']] }.unshift(["--Select--", ''])
    @partial = "lease_form"
    render "index"
  end

  def appraisal
    @broker_option_list = User.get_broker_list.map {|b| [b['name'], b['id']] }.unshift(["--Select--", ''])
    @partial = "appraisal_form"
    render "index"
  end

  def tax_protest
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
puts params.inspect
    bill_customer = params['billCustomer']['customerId'] || Customer.create_with_params!(params['billCustomer']).id
    ret = {'success' => true, 'errors' => [], 'dealId' => ''}

    begin
      deal = Deal.new   
      deal.deal_type_id = DealType.find_by_key(params['dealType']).id
      deal.primary_broker_id = params['mainBroker']
      deal.billed_customer_id = bill_customer unless bill_customer.blank?
      deal.billed_customer_attention = params['billCustomer']['attention']
      deal.total_due_to_kda = params['totalDueToKDA']
      deal.created_by_id = current_user.id
      deal.save!
      ret['dealId'] = deal.id
      
      case params['dealType']
      when "sale"
        DealsSale.create_deal!(deal.id, params, current_user)
        deal.comments = params['marketingInfo']['broker_comments']
      when "lease"
        DealsLease.create_deal!(deal.id, params, current_user)
      when "appraisal"
        DealsAppraisal.create_deal!(deal.id, params, current_user)
      when "tax_protest"
        DealsTaxProtest.create_deal!(deal.id, params, current_user)
      else
      end
    rescue Exception => e
      logger.error e
      logger.error e.backtrace.join("\n")
      ret['success'] = false
      ret['errors'] << e.message
    end

    render :json => ret
  end
end
