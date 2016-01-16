class ExerciseSet < ApplicationRecord
  belongs_to :workout
  belongs_to :exercise

  validates :position, :reps, :weight,
    numericality: {greater_than: 0}
end
