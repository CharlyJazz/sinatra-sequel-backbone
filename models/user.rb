class User < Sequel::Model(:users)
  plugin :secure_password
  plugin :timestamps
  plugin :validation_helpers
  plugin :json_serializer

  def validate
    super
    validates_presence [:name, :password, :password_confirmation, :email]
    validates_format RegexPattern::Email, :email
    validates_format RegexPattern::Username, :name
  end
  
  many_to_many :roles
  one_to_many :snippets
  one_to_many :proyects
  one_to_many :like_proyects
  one_to_many :like_snippets
  one_to_many :comment_snippets
  one_to_many :comment_proyects
end