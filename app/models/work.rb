class Work < ActiveRecord::Base
  
  extend FriendlyId
  friendly_id :brand_name, use: :slugged
  include Filterable
  
  require "addressable/uri"
  
  require 'csv'
  
  def self.import(file)
    CSV.foreach(file.path, headers:true) do |row|
      work = Work.find_or_initialize_by(campaign_title: row["campaign_title"])
      work.assign_attributes(row.to_hash)
      work.save!
    end
  end
  
  def self.import(file)
    CSV.foreach(file.path, headers: true) do |row|
      listing_hash = {:brand_name => row['brand_name'], :campaign_title => row['campaign_title'], :agency => row['agency'],
      :track_name => row['track_name'], :artist_name => row['artist_name'], :description => row['description'], :vimeo => row['vimeo'],
      :platform => row['platform'], :slideshow => row['slideshow'], :slide_title => row['slide_title'], :image => URI.parse(row['image_url']), 
      :fb_image => URI.parse(row['fb_image_url']), :slide_image => URI.parse(row['slide_image_url'])}
      listing = Work.where(id:listing_hash["id"])
      if listing.count > 0
        Work.first.update_attributes(listing_hash)
      else
        Work.create!(listing_hash)
      end # end if !product.nil?
    end # end CSV.foreach
  end # end self.import(file)
  
  include RankedModel
  ranks :row_order
  
  if Rails.env.development?
    has_attached_file :image, IMAGE_PAPERCLIP_STORAGE_OPTS
  else
    has_attached_file :image,
    :convert_options => { :all => '-quality 92' }, 
    styles: {main: '300x300>'},
    :storage => :s3,
    :s3_credentials => {
    :access_key_id => ENV['S3_KEY'],
    :secret_access_key => ENV['S3_SECRET'] },
    :url => ':s3_alias_url',
    :s3_host_alias => 'dpyn2hq0qgwcx.cloudfront.net', 
    :bucket => 'elephant-two',
    :path => "works/images/:id_partition/:style/:filename"
  end
  
  if Rails.env.development?
    has_attached_file :hero, HERO_PAPERCLIP_STORAGE_OPTS
  else
    has_attached_file :hero,
    :convert_options => { :all => '-quality 92' }, 
    styles: {main: '564x235>'},
    :storage => :s3,
    :s3_credentials => {
    :access_key_id => ENV['S3_KEY'],
    :secret_access_key => ENV['S3_SECRET'] },
    :url => ':s3_alias_url',
    :s3_host_alias => 'dpyn2hq0qgwcx.cloudfront.net', 
    :bucket => 'elephant-two',
    :path => "works/hero_images/:id_partition/:style/:filename"
  end
  
  # Validate the attached image is image/jpg, image/png, etc
  validates_attachment_content_type :image, :content_type => /\Aimage\/.*\Z/
  
  if Rails.env.development?
    has_attached_file :fb_image, FB_IMAGE_PAPERCLIP_STORAGE_OPTS
  else
    has_attached_file :fb_image,
    :convert_options => { :all => '-quality 92' }, 
    styles: {main: '1200x630>'},
    :storage => :s3,
    :s3_credentials => {
    :access_key_id => ENV['S3_KEY'],
    :secret_access_key => ENV['S3_SECRET'] },
    :url => ':s3_alias_url',
    :s3_host_alias => 'dpyn2hq0qgwcx.cloudfront.net', 
    :bucket => 'elephant-two',
    :path => "works/fb_images/:id_partition/:style/:filename"
  end
  
  # Validate the attached image is image/jpg, image/png, etc
  validates_attachment_content_type :fb_image, :content_type => /\Aimage\/.*\Z/
  
  if Rails.env.development?
    has_attached_file :slide_image, SLIDE_PAPERCLIP_STORAGE_OPTS
  else
    has_attached_file :slide_image,
    :convert_options => { :all => '-quality 92' }, 
    styles: {main: '1115x952>'},
    :storage => :s3,
    :s3_credentials => {
    :access_key_id => ENV['S3_KEY'],
    :secret_access_key => ENV['S3_SECRET'] },
    :url => ':s3_alias_url',
    :s3_host_alias => 'dpyn2hq0qgwcx.cloudfront.net', 
    :bucket => 'elephant-two',
    :path => "works/slide_images/:id_partition/:style/:filename"
  end
  
  # Validate the attached image is image/jpg, image/png, etc
  validates_attachment_content_type :slide_image, :content_type => /\Aimage\/.*\Z/
  
  def self.search(search)
    if search.to_s.include? "slide"
      where('slideshow = TRUE') # Needs to be - where('slideshow = "t"') in development and - where('slideshow = TRUE') in production
    elsif search.to_s.include? "news"
      where('newsletter = TRUE')
    elsif search
      where('LOWER(brand_name) LIKE :search OR LOWER(campaign_title) LIKE :search 
      OR LOWER(agency) LIKE :search OR LOWER(vimeo) LIKE :search OR LOWER(platform) LIKE :search', search: "%#{search}%")
    else
      all
    end
  end
  
end