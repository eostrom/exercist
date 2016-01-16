class Workout < ApplicationRecord
  has_many :sets, class_name: 'ExerciseSet'

  validates :date,
    presence: true
end
