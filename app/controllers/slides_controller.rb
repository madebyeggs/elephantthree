class SlidesController < ApplicationController
  
  def index
    define_slides
    set_meta_tags :og => {
      :url => "#{@currentUrl}",
      :title    => 'Elephant Music | News',
      :description => 'Unique Music to Picture'
    }
    set_meta_tags twitter: {
      card: "summary_large_image",
      site: "@Elephant__Music",
      title: "Elephant Music | News",
      description: "Unique Music to Picture"
    }
  end
  
  def show
    @slide = (Work.find_by_slug(params[:id]))
    set_meta_tags og: {
      url: "#{@currentUrl}",
      image: "#{@slide.fb_image}",
      title: "#{@slide.slide_title}",
      description: "#{@slide.description}",
      type: "musician"
    }
    set_meta_tags twitter: {
      card: "summary_large_image",
      site: "@Elephant__Music",
      title: "#{@slide.slide_title}",
      description: "#{@slide.description}",
      image: "#{@slide.fb_image}"
    }
  end
  
end