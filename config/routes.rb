Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  
  # A route to translate a phrase
  post '/say', to: 'translations#start'

  # A route to get all of the saved phrases
  get '/list', to: 'chains#list'
  # A route to save a result
  post '/save', to: 'chains#save'
  # A route to like a saved a result
  patch '/like/:id', to: 'chains#like'
  # A route to dislike a saved a result
  patch '/dislike/:id', to: 'chains#dislike'
  # A route to save a result
  delete '/delete/:id', to: 'chains#delete'
  # Catch anything else and redirect to the root
  get '*any', via: :all, to: redirect('/')
end
