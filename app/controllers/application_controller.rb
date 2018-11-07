class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  
  def define_slides
    @slide_works = Work.where('slideshow = ?', true)
    @slides = [@slide_works].flatten
    @sorted_slides = @slides.sort_by {|slide| [slide.Slideshowposition ? 0 : 1,slide.Slideshowposition || 0]}
  end
  
  def define_customs
    @custom_count = Custom.where('display = ?', true).count
    @custom_displays = Custom.where('display = ?', true)
    @clogo = Clogo.first
    if Clogo.first.randombox?
      @sorted_custom_displays = @custom_displays.order("RANDOM()").limit(5) 
    else
      @sorted_custom_displays = @custom_displays.rank(:row_order).all.limit(5)
    end
  end
  
  def define_showreels
    @showreels = Showreel.where('showreel = ?', true)
    @customvideos = Customvideo.where('showreel = ?', true)
    @showreelvideos = [@showreels, @customvideos].flatten
    @sorted_showreelvideos = @showreelvideos.sort_by {|srv| [srv.showreelposition ? 0 : 1,srv.showreelposition || 0]}
    @clogo = Clogo.first
  end
  
  def define_newsletters
    @newsletters_works = Work.where('newsletter = ?', true)
    @newsletters_announcement = Announcement.where('newsletter = ?', true)
    @newsletters = [@newsletters_works, @newsletters_announcement].flatten
    @first_newsletter = Newsletter.first
    @second_newsletter = Newsletter.second
    @sorted_newsletters = @newsletters.sort_by {|nl| [nl.newsletterposition ? 0 : 1,nl.newsletterposition || 0]}
    @first_newsletter_work =  @sorted_newsletters.first
    @second_newsletter_work =  @sorted_newsletters.second
    @rest_newsletter_works = @sorted_newsletters[2..-1]
    @newsletters_releases = Release.where('newsletter = ?', true).order(:newsletterposition)
  end
  
end