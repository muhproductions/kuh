Rails.application.routes.draw do
  root 'welcome#index'

  get 'about' => 'about#index'

  post 'gists' => 'gists#create'

  get 'gists/new' => 'gists#new'
  get 'gists/:id' => 'gists#show', as: :gist
end
