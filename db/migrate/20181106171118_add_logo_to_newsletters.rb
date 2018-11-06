class AddLogoToNewsletters < ActiveRecord::Migration
  def self.up
    add_attachment :newsletters, :logo
  end

  def self.down
    remove_attachment :newsletters, :logo
  end
end
