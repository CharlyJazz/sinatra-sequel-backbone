source 'https://rubygems.org'

gem 'sinatra'
gem "sinatra-extension"
gem "sinatra-flash"
gem 'sinatra-redirect-with-flash', require: 'sinatra/redirect_with_flash'
gem 'sinatra-sequel', '~> 0.9.0'
gem 'sequel_secure_password'
gem "sequel"
gem 'sqlite3'
gem "rake"
gem "language_sniffer", :git => 'git://github.com/grosser/language_sniffer.git', require: false

group :test do #  bundle install --without test 
  gem 'factory_girl', '~> 4.0', require: false
  gem 'webmock'
  gem "rspec"
  gem "rack-test"
  gem 'capybara', "~>2.12.0"
  gem "selenium-webdriver"
  gem "webdrivers", "~> 2.3"
  gem 'database_cleaner'
end