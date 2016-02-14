class ExerciseSetsController < ApplicationController
  def create
    @set = ExerciseSet.create(set_params)

    render json: @set
  end

  private

  def set_params
    params.require(:exercise_set).permit(:exercise_name, :reps, :weight)
  end
end
