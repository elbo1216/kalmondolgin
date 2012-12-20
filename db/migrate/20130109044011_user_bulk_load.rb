class UserBulkLoad < ActiveRecord::Migration
  def up
    File.open("#{Rails.root.to_s}/data/users.data").each do |line|
      name = line.split(",")
      user = User.new
      user.first_name = name[0]
      user.last_name = name[1].chomp
      user.key = "#{name[0][0,1]}#{name[1][0,1]}"
      user.dob = Time.now
      user.end_date = Time.now
      user.password = "kalmondolgin"
      user.email = "#{name[0]}.#{name[1].chomp}@kalmondolgin.com"
      user.start_date = Time.now
      user.save!
    end
  end

  def down
    sql = "TRUNCATE users cascade"
    execute sql
  end
end
