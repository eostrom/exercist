class ExerciseSet < ApplicationRecord
  belongs_to :exercise
  # We're not using Workouts yet, so I'm not going to bother creating
  # them. If we need them later, we can reconstruct them from the data.
  belongs_to :workout, optional: true

  validates :reps, :weight,
    numericality: {greater_than: 0}

  validates :exercise,
    presence: true

  delegate :name, to: :exercise, prefix: true

  def exercise_name=(name)
    self.exercise = Exercise.find_or_create_by(name: name) if name.present?
  end
end
