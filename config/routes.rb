Rails.application.routes.draw do
  
  devise_for :users, path: "auth", path_names: { sign_in: 'login', sign_out: 'logout', sign_up: 'create_new_elephanter' }
  
  root 'slides#index'
  
  resources :announcements
  resources :announcements do
    post :update_row_order, on: :collection
    collection {post :import}
  end
  resources :admins, :path => "admin"
  resources :works, :path => "placements"
  resources :works do
    post :update_row_order, on: :collection
    collection {post :import}
  end
  
  match "admins/placements" => "admins#placements", via: [:get, :post]
  match "admins/slideshow" => "admins#slideshow", via: [:get, :post]
  match "admins/announcements" => "admins#announcements", via: [:get, :post]
  
end