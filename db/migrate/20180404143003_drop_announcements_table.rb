class DropAnnouncementsTable < ActiveRecord::Migration
  def up
    drop_table :announcements
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
  
end