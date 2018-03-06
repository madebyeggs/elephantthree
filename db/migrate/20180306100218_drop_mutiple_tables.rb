class DropMutipleTables < ActiveRecord::Migration
  def change
    drop_table :artists
    drop_table :clogos
    drop_table :customs
    drop_table :newsletters
    drop_table :releases
    drop_table :researches
  end
end
