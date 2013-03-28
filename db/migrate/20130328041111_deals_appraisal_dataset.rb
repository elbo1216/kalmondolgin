class DealsAppraisalDataset < ActiveRecord::Migration
  def up
    sql = "CREATE TABLE deals_appraisals (
      id                                    serial primary key,
      deal_id                               integer references deals(id),
      work_performed                        text,
      created_at                            timestamp not null default now(),
      updated_at                            timestamp not null default now()
    )"
    execute sql

    add_index :deals_appraisals, :deal_id
  end

  def down
    sql = "DROP TABLE deals_appraisals CASCADE"
    execute sql
  end
end
