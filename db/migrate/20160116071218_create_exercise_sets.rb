class CreateExerciseSets < ActiveRecord::Migration[5.0]
  def change
    create_table :exercise_sets do |t|
      t.references :workout, index: true, foreign_key: true
      t.references :exercise, index: true, foreign_key: true
      t.integer :position
      t.integer :reps
      t.decimal :weight, precision: 5, scale: 2

      t.timestamps
    end
  end
end
