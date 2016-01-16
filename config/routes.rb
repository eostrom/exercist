Rails.application.routes.draw do
  resources :exercise_sets
  resources :exercises
  resources :workouts
end
