class AdminsController < ApplicationController
  before_action :authenticate_user!
  
  
  def placements
    @works = Work.search(params[:search]).rank(:row_order).all
  end
  
  def announcements
    @announcements = Announcement.rank(:row_order).all
    respond_to do |format|
      format.html
      format.json {render :json => @announcements}
    end
  end
  
  def index
    define_slides
    respond_to do |format|
      format.html
      format.json {render :json => @slides}
    end
  end
  
end