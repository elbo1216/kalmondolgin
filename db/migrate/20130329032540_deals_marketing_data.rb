class DealsMarketingData < ActiveRecord::Migration
  def up
    sql = "CREATE TABLE deals_marketing_data (
      id                                    serial primary key,
      deal_id                               integer references deals(id),
      sign_on_building                      boolean default false not null,
      kda_exclusive                         boolean default false not null,
      advertise_type                        text,
      buyer_referral_type                   text,
      listing_period                        integer,
      created_at                            timestamp not null default now(),
      updated_at                            timestamp not null default now()
    )"
    execute sql
 
    add_index :deals_marketing_data, :deal_id
  end

  def down
    sql = "DROP TABLE deals_marketing_data CASCADE"
    execute sql
  end
end
