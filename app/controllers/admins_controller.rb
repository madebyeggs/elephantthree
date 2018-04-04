class AdminsController < ApplicationController
  before_action :authenticate_user!
  
  def index
    define_slides
    @works = Work.search(params[:search]).rank(:row_order).all
    respond_to do |format|
      format.html
      format.json {render :json => @slides}
    end
  end
  
end