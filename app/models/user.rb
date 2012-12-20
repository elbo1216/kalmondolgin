class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable,
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  # Setup accessible (or protected) attributes for your model
  attr_accessible :email, :password, :password_confirmation, :remember_me
  # attr_accessible :title, :body

  has_many :user_groups

  def User.get_broker_list
    User.all(:joins => {:user_groups => :group}, :conditions => {:groups => { :key => 'brokers'} } ).map { |u| {"id" => u.id, "name" => "#{u.first_name} #{u.last_name}", "key" => u.key}}
  end

  def is_admin
    true
  end
end
