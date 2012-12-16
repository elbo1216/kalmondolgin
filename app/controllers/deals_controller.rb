class DealsController < ApplicationController
  layout 'frame'

  def index
    redirect_to "/deals/sale"
  end

  def sale
    @partial = "sale_form"
    @form_label = "Sale"
    @show_extra_broker_info = true
    render "index"
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
end
