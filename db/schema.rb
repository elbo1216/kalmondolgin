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

ActiveRecord::Schema.define(:version => 20130205030724) do

  create_table "countries", :force => true do |t|
    t.string   "iso_code",   :limit => 3, :null => false
    t.string   "name",                    :null => false
    t.datetime "created_at",              :null => false
  end

  create_table "customers", :force => true do |t|
    t.integer  "created_by",                   :null => false
    t.string   "first_name",                   :null => false
    t.string   "last_name",                    :null => false
    t.string   "company"
    t.string   "street_line1", :limit => 1024, :null => false
    t.string   "street_line2", :limit => 1024
    t.string   "city",                         :null => false
    t.string   "state"
    t.string   "zip",          :limit => 50
    t.string   "country",      :limit => 3
    t.datetime "deleted_at"
    t.integer  "deleted_by",                   :null => false
    t.datetime "created_at",                   :null => false
    t.datetime "updated_at",                   :null => false
  end

  add_index "customers", ["created_by"], :name => "index_customers_on_created_by"

  create_table "deal_types", :force => true do |t|
    t.string   "key",         :null => false
    t.string   "name",        :null => false
    t.text     "description"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
  end

  create_table "deals", :force => true do |t|
    t.integer  "deal_type_id",                                                                                      :null => false
    t.integer  "billed_customer_id",                                                                                :null => false
    t.string   "billed_customer_principal1"
    t.string   "billed_customer_principal1_phone", :limit => 50
    t.string   "billed_customer_principal1_email"
    t.string   "billed_customer_principal2"
    t.string   "billed_customer_principal2_phone", :limit => 50
    t.string   "billed_customer_principal2_email"
    t.integer  "target_customer_id",                                                                                :null => false
    t.integer  "primary_broker_id",                                                                                 :null => false
    t.integer  "property_id",                                                                                       :null => false
    t.string   "type_of_use",                      :limit => 512
    t.integer  "term"
    t.date     "start_date"
    t.decimal  "annual_rent",                                     :precision => 10, :scale => 2
    t.decimal  "sale_price",                                      :precision => 10, :scale => 2
    t.decimal  "security",                                        :precision => 10, :scale => 2
    t.string   "attorney"
    t.text     "notes"
    t.boolean  "kda_sign",                                                                       :default => false
    t.boolean  "kda_exclusive",                                                                  :default => false
    t.integer  "advertise_type_id"
    t.integer  "customer_referred_type"
    t.integer  "listing_age"
    t.integer  "option_count"
    t.date     "option_start_date"
    t.integer  "late_charge"
    t.integer  "grace_period"
    t.datetime "created_at",                                                                                        :null => false
    t.datetime "updated_at",                                                                                        :null => false
  end

  add_index "deals", ["billed_customer_id"], :name => "index_deals_on_billed_customer_id"
  add_index "deals", ["deal_type_id"], :name => "index_deals_on_deal_type_id"
  add_index "deals", ["primary_broker_id"], :name => "index_deals_on_primary_broker_id"
  add_index "deals", ["property_id"], :name => "index_deals_on_property_id"
  add_index "deals", ["target_customer_id"], :name => "index_deals_on_target_customer_id"

  create_table "groups", :force => true do |t|
    t.string   "name"
    t.string   "key",                         :null => false
    t.string   "description", :limit => 1024
    t.datetime "created_at",                  :null => false
    t.datetime "updated_at",                  :null => false
  end

  add_index "groups", ["key"], :name => "index_groups_on_key", :unique => true
  add_index "groups", ["name"], :name => "index_groups_on_name"

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
