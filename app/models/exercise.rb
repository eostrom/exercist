class Exercise < ApplicationRecord
  has_many :sets, class_name: 'ExerciseSet'

  validates :name,
    presence: true
end
