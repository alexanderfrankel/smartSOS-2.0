require 'faker'
require 'vacuum'
require 'yaml'

def reset_database!
  ActiveRecord::Base.connection.execute <<-EOL
    TRUNCATE TABLE campaigns, donors, items, organizations, pledges, requests;
  EOL
end

reset_database!

# ITEM SEED

# Other ASINS:
# asins = %w[ B0069FTP0G B001949TKS B0039PV1QK B005FEGYJC B000GCRWCG B005VYRBRA B001YJHEDW
#             B002GYVFOI B004E3EIEI B000KKB2OS B001U6MJCK B00363WZY2 B00363X1M2 B001HT720O
#             B00IKLHDLU B004VLKLJE B00BG2BBSG B005IRWWZ6 B00008W2LC B00BLZ2312 ]

asins = %w[ B0069FTP0G B001949TKS B0039PV1QK B005FEGYJC B000GCRWCG B005VYRBRA B001YJHEDW
            B00BGN8PLG
            B00BLZ2312
            B008EIY0F6
            B00CRCKDMY
            B000R5NRPI
            B00IT711GS
            B0069FTP0G
            B000GD653C
            B0029NYQQA
            B001LK6XHC
            B0037DUAIY
            B007DI14WA
            B004CX2VSU
            B004QM0OFE
            B009443960
            B000M5U6CU
            B005FGPXDS
            B001STX13U
            B005M16TDY
            B000GCRWCG
            B004356WLY
            B008DEYGJQ
            B00ASBOP9S
            B00AQIULD2
            B00ASBOPDE
            B001UB44SM]



def retrieve_data(asin)

    req = Vacuum.new
    config = YAML.load_file(File.expand_path('config/secrets.yml', Rails.root))[Rails.env]
    req.configure(
      aws_access_key_id:     config['access_key_id'],
      aws_secret_access_key: config['secret_access_key'],
      associate_tag:         'sm0cd-2'
    )

    params = {
      'ItemId'        => asin,
      'ResponseGroup' => 'ItemAttributes, ItemIds, Large'

    }

    return req.item_lookup(query: params).to_h
end

asins.each do |asin|
  begin
    item_data = retrieve_data(asin)
    item_attributes = { name: item_data["ItemLookupResponse"]["Items"]["Item"]["ItemAttributes"]["Title"],
                        asin: asin,
                        category: item_data["ItemLookupResponse"]["Items"]["Item"]["ItemAttributes"]["ProductGroup"],
                        img_url: item_data["ItemLookupResponse"]["Items"]["Item"]["SmallImage"]["URL"],
                        price: item_data["ItemLookupResponse"]["Items"]["Item"]["OfferSummary"]["LowestNewPrice"]["Amount"]
                      }

    item = Item.new(item_attributes)
    puts "Item saved." if item.save
  rescue NoMethodError, Excon::Errors::ServiceUnavailable
    STDOUT.puts "Failed to retrieve #{asin}"
  end
end


# ORGANIZATION SEED

organizations = [["Red Cross", "redcross@redcross.org"], ["UNICEF", "unicef@unicef.org"]]

organizations.each do |org|
  puts organizations.count
  puts 'org'
  Organization.create(
                        name: org[0],
                        street: Faker::Address.street_address,
                        city: Faker::Address.city,
                        state: Faker::Address.state,
                        zipcode: Faker::Address.zip_code,
                        email: org[1],
                        password: "yolo",
                        password_confirmation: "yolo",
                        phone: Faker::PhoneNumber.phone_number,
                        description: Faker::Lorem.paragraph(sentence_count=3),
                        url: Faker::Internet.url)
end


# DONOR SEED

10.times do
  puts 'donor'
  Donor.create( first_name: Faker::Name.first_name,
                last_name: Faker::Name.last_name,
                email: Faker::Internet.email,
                password: "yolo",
                password_confirmation: "yolo")
end

# CAMPAIGN SEED

Organization.all.each do |org|
  puts "*" * 100
  campaign_names = [  ["Hurricane Alex Relief", "Please help those affected by Hurricane Alex by donating today."],
                      ["Tsunami Relief", "Please help those affected by the tsunami by donating today."] ]
  campaign_names.each do |campaign_name|
    puts 'campaign'
    org.campaigns << Campaign.create(
                      name: campaign_name[0],
                      description: campaign_name[1],
                      end_date: '06-25-2014')
  end
end


# REQUEST SEED

Campaign.all.each do |campaign|
  items = Item.all
  7.times do
    puts 'request'
    Request.create( campaign_id: campaign.id,
                    item_id: items.pop.id,
                    quantity: rand(10))
  end


# PLEDGE SEED

  requests = Request.all
  donors = Donor.all
  2.times do
    puts 'pledge'
    Pledge.create(  donor_id: donors.pop.id,
                    request_id: requests.pop.id,
                    quantity: rand(10))
  end
end
