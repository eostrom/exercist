class ExerciseSetsController < ApplicationController
  def index
    render json: ExerciseSet.order('created_at desc')
  end

  def create
    @set = ExerciseSet.create(set_params)

    render json: @set
  end

  def update
    @set = ExerciseSet.find(params[:id])

    @set.update(set_params)

    render json: @set
  end

  private

  def set_params
    params.require(:exercise_set).permit(:exercise_name, :reps, :weight)
  end
end
