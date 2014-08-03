Smartsos::Application.routes.draw do
  root :to => 'pages#homepage'

  get '/aboutus' => 'pages#aboutus'

  resources :organizations, except: [:destroy, :index]

  resources :campaigns, except: [:destroy] do
    resources :requests, except: [:show, :index, :edit]
    resources :pledges, only: [:new, :create]
  end

	resources :items, only: [:create]

  resources :donors, only: [:new, :create]

  resources :password_resets

  resources :confirm_account

  # SESSION ROUTES
  get '/sessions/login/organizations' => 'sessions#organizations_login', as: :organizations_login
  post '/sessions/create/organizations' => 'sessions#organizations_create'

  get '/sessions/login/donors' => 'sessions#donors_login', as: :donors_login
  post '/sessions/create/donors' => 'sessions#donors_create'

  get '/sessions/logout' => 'sessions#logout'
end
