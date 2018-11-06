class AddCustomToCustomvideos < ActiveRecord::Migration
  def change
    add_reference :customvideos, :custom
  end
end
