# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20130513220536) do

  create_table "a", :id => false, :force => true do |t|
    t.integer "id",   :null => false
    t.text    "name"
  end

  create_table "b", :id => false, :force => true do |t|
    t.integer "id"
    t.integer "a_id"
    t.text    "name"
  end

  create_table "c", :id => false, :force => true do |t|
    t.integer "id",   :null => false
    t.integer "a_id"
    t.text    "name"
  end

  create_table "countries", :force => true do |t|
    t.string   "iso_code",   :limit => 3, :null => false
    t.string   "name",                    :null => false
    t.datetime "created_at",              :null => false
  end

  create_table "customer_principals", :force => true do |t|
    t.integer  "customer_id",                   :null => false
    t.integer  "deal_id",                       :null => false
    t.string   "principal_name",                :null => false
    t.string   "principal_email"
    t.string   "principal_phone", :limit => 15
    t.datetime "created_at",                    :null => false
    t.datetime "updated_at",                    :null => false
  end

  create_table "customers", :force => true do |t|
    t.integer  "created_by_id",                 :null => false
    t.string   "first_name",                    :null => false
    t.string   "last_name",                     :null => false
    t.string   "company"
    t.string   "street_line1",  :limit => 1024, :null => false
    t.string   "street_line2",  :limit => 1024
    t.string   "city",                          :null => false
    t.string   "state"
    t.string   "zip",           :limit => 50
    t.string   "country",       :limit => 3
    t.datetime "deleted_at"
    t.integer  "deleted_by"
    t.datetime "created_at",                    :null => false
    t.datetime "updated_at",                    :null => false
  end

  add_index "customers", ["created_by_id"], :name => "index_customers_on_created_by"

  create_table "d", :id => false, :force => true do |t|
    t.integer "id",   :null => false
    t.integer "a_id"
    t.text    "name"
  end

  create_table "deal_types", :force => true do |t|
    t.string   "key",         :null => false
    t.string   "name",        :null => false
    t.text     "description"
    t.text     "table_ref"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
  end

  create_table "deals", :force => true do |t|
    t.integer  "deal_type_id",                                            :null => false
    t.integer  "billed_customer_id",                                      :null => false
    t.string   "billed_customer_attention"
    t.integer  "primary_broker_id",                                       :null => false
    t.text     "comments"
    t.decimal  "total_due_to_kda",          :precision => 8, :scale => 2, :null => false
    t.datetime "created_at",                                              :null => false
    t.datetime "updated_at",                                              :null => false
    t.integer  "created_by_id",                                           :null => false
  end

  add_index "deals", ["billed_customer_id"], :name => "index_deals_on_billed_customer_id"
  add_index "deals", ["deal_type_id"], :name => "index_deals_on_deal_type_id"
  add_index "deals", ["primary_broker_id"], :name => "index_deals_on_primary_broker_id"

  create_table "deals_appraisals", :force => true do |t|
    t.integer  "deal_id"
    t.text     "work_performed"
    t.datetime "created_at",     :null => false
    t.datetime "updated_at",     :null => false
  end

  add_index "deals_appraisals", ["deal_id"], :name => "index_deals_appraisals_on_deal_id"

  create_table "deals_brokers", :force => true do |t|
    t.integer  "deal_id",    :null => false
    t.integer  "broker_id",  :null => false
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "deals_brokers", ["broker_id"], :name => "index_deals_brokers_on_broker_id"
  add_index "deals_brokers", ["deal_id"], :name => "index_deals_brokers_on_deal_id"

  create_table "deals_co_brokerages", :force => true do |t|
    t.integer  "deal_id",                 :null => false
    t.string   "co_brokerage",            :null => false
    t.integer  "co_brokerage_percentage", :null => false
    t.datetime "created_at",              :null => false
    t.datetime "updated_at",              :null => false
  end

  add_index "deals_co_brokerages", ["deal_id"], :name => "index_deals_co_brokerages_on_deal_id"

  create_table "deals_late_charges", :force => true do |t|
    t.integer  "deal_id"
    t.integer  "percent"
    t.integer  "grace_period"
    t.datetime "created_at",   :null => false
    t.datetime "updated_at",   :null => false
  end

  add_index "deals_late_charges", ["deal_id"], :name => "index_deals_late_charges_on_deal_id"

  create_table "deals_leases", :force => true do |t|
    t.integer  "deal_id"
    t.integer  "property_id",                                                      :null => false
    t.integer  "leaser_customer_id",                                               :null => false
    t.string   "leaser_attention"
    t.decimal  "annual_rent_price",                 :precision => 10, :scale => 2, :null => false
    t.string   "type_of_use",        :limit => 512
    t.string   "term_of_lease"
    t.date     "start_date",                                                       :null => false
    t.decimal  "security",                          :precision => 10, :scale => 2
    t.datetime "created_at",                                                       :null => false
    t.datetime "updated_at",                                                       :null => false
  end

  add_index "deals_leases", ["deal_id"], :name => "index_deals_leases_on_deal_id"
  add_index "deals_leases", ["leaser_customer_id"], :name => "index_deals_leases_on_leaser_customer_id"
  add_index "deals_leases", ["property_id"], :name => "index_deals_leases_on_property_id"

  create_table "deals_marketing_data", :force => true do |t|
    t.integer  "deal_id"
    t.boolean  "sign_on_building",    :default => false, :null => false
    t.boolean  "kda_exclusive",       :default => false, :null => false
    t.text     "advertise_type"
    t.text     "buyer_referral_type"
    t.integer  "listing_period"
    t.datetime "created_at",                             :null => false
    t.datetime "updated_at",                             :null => false
  end

  add_index "deals_marketing_data", ["deal_id"], :name => "index_deals_marketing_data_on_deal_id"

  create_table "deals_sales", :force => true do |t|
    t.integer  "deal_id"
    t.integer  "property_id",                                                         :null => false
    t.integer  "purchaser_customer_id",                                               :null => false
    t.string   "purchaser_attention"
    t.decimal  "sale_price",                           :precision => 10, :scale => 2, :null => false
    t.string   "type_of_use",           :limit => 512
    t.string   "attorney"
    t.datetime "created_at",                                                          :null => false
    t.datetime "updated_at",                                                          :null => false
  end

  add_index "deals_sales", ["deal_id"], :name => "index_deals_sales_on_deal_id"
  add_index "deals_sales", ["property_id"], :name => "index_deals_sales_on_property_id"
  add_index "deals_sales", ["purchaser_customer_id"], :name => "index_deals_sales_on_purchaser_customer_id"

  create_table "deals_tax_protests", :force => true do |t|
    t.integer  "deal_id"
    t.text     "work_performed"
    t.datetime "created_at",     :null => false
    t.datetime "updated_at",     :null => false
  end

  add_index "deals_tax_protests", ["deal_id"], :name => "index_deals_tax_protests_on_deal_id"

  create_table "groups", :force => true do |t|
    t.string   "name"
    t.string   "key",                         :null => false
    t.string   "description", :limit => 1024
    t.datetime "created_at",                  :null => false
    t.datetime "updated_at",                  :null => false
  end

  add_index "groups", ["key"], :name => "index_groups_on_key", :unique => true
  add_index "groups", ["name"], :name => "index_groups_on_name"

  create_table "lease_options", :force => true do |t|
    t.integer  "deal_id"
    t.integer  "option_count",                   :null => false
    t.date     "begin_date",                     :null => false
    t.integer  "option_notification_for_broker"
    t.datetime "created_at",                     :null => false
    t.datetime "updated_at",                     :null => false
  end

  add_index "lease_options", ["deal_id"], :name => "index_lease_options_on_deal_id"

  create_table "payment_schedules", :force => true do |t|
    t.integer  "deal_id",                                                      :null => false
    t.date     "due_date",                                                     :null => false
    t.decimal  "amount_due", :precision => 10, :scale => 2,                    :null => false
    t.boolean  "is_paid",                                   :default => false, :null => false
    t.datetime "created_at",                                                   :null => false
    t.datetime "updated_at",                                                   :null => false
  end

  add_index "payment_schedules", ["deal_id"], :name => "index_payment_schedules_on_deal_id"
  add_index "payment_schedules", ["due_date"], :name => "index_payment_schedules_on_due_date"

  create_table "properties", :force => true do |t|
    t.string   "street_line1",  :limit => 1024, :null => false
    t.string   "street_line2",  :limit => 1024
    t.string   "city",          :limit => 1024, :null => false
    t.string   "state",         :limit => 2,    :null => false
    t.string   "country",       :limit => 3,    :null => false
    t.integer  "space_type_id",                 :null => false
    t.integer  "size"
    t.datetime "deleted_at"
    t.datetime "created_at",                    :null => false
    t.datetime "updated_at",                    :null => false
    t.string   "zip",           :limit => 10
  end

  add_index "properties", ["space_type_id"], :name => "index_properties_on_space_type_id"

  create_table "space_types", :force => true do |t|
    t.string   "key",         :null => false
    t.string   "name",        :null => false
    t.text     "description"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
  end

  add_index "space_types", ["key"], :name => "index_space_types_on_key"

  create_table "us_states", :force => true do |t|
    t.string "code", :limit => 2, :null => false
    t.string "name",              :null => false
  end

  create_table "user_groups", :force => true do |t|
    t.integer  "user_id",    :null => false
    t.integer  "group_id",   :null => false
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "user_groups", ["group_id", "user_id"], :name => "index_user_groups_on_group_id_and_user_id", :unique => true
  add_index "user_groups", ["group_id"], :name => "index_user_groups_on_group_id"
  add_index "user_groups", ["user_id"], :name => "index_user_groups_on_user_id"

  create_table "users", :force => true do |t|
    t.string   "email",                  :default => "", :null => false
    t.string   "encrypted_password",     :default => "", :null => false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          :default => 0
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.string   "first_name",                             :null => false
    t.string   "last_name",                              :null => false
    t.string   "key",                                    :null => false
    t.date     "dob",                                    :null => false
    t.date     "start_date",                             :null => false
    t.date     "end_date"
    t.string   "address_line1"
    t.string   "address_line2"
    t.string   "city"
    t.string   "state"
    t.string   "zip"
    t.string   "office_number"
    t.string   "mobile_number"
    t.string   "fax_number"
    t.string   "security_question"
    t.string   "security_answer"
    t.datetime "created_at",                             :null => false
    t.datetime "updated_at",                             :null => false
  end

  add_index "users", ["email"], :name => "index_users_on_email", :unique => true
  add_index "users", ["reset_password_token"], :name => "index_users_on_reset_password_token", :unique => true

end
