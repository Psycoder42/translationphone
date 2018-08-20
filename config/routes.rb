Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  # The only route that does any work
  post '/say', to: 'translations#start'
  # Catch anything else and redirect to the root
  get '*any', via: :all, to: redirect('/')
end
