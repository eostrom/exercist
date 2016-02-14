class ExerciseSet < ApplicationRecord
  belongs_to :workout
  belongs_to :exercise

  validates :reps, :weight,
    numericality: {greater_than: 0}

  validates :exercise,
    presence: true

  def exercise_name=(name)
    self.exercise = Exercise.find_or_create_by(name: name)
  end
end
