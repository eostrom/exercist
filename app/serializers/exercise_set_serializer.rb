class ExerciseSetSerializer < ActiveModel::Serializer
  attributes :id, :exercise_name, :weight, :reps, :created_at
end
