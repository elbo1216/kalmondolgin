class DealsTaxProtestDataset < ActiveRecord::Migration
  def up
    sql = "CREATE TABLE deals_tax_protests (
      id                                    serial primary key,
      deal_id                               integer references deals(id),
      work_performed                        text,
      created_at                            timestamp not null default now(),
      updated_at                            timestamp not null default now()
    )"
    execute sql

    add_index :deals_tax_protests, :deal_id
  end

  def down
    sql = "DROP TABLE deals_tax_protests CASCADE"
    execute sql
  end
end
