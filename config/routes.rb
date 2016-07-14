Rails.application.routes.draw do
  root 'welcome#index'

  get 'about' => 'about#index'

  get 'logout' => 'login#logout'

  get 'login' => 'login#index'
  post 'login' => 'login#login'

  post 'gists' => 'gists#create'

  get 'gists/new' => 'gists#new'
  get 'gists/:id' => 'gists#show', as: :gist
end
