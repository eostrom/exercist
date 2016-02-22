export class ExerciseSet {
    constructor(attributes = {}) { Object.assign(this, attributes) }

    id: number;
    exercise_name: string;
    weight: number;
    reps: number;

    persisted() : boolean {
        return this.id != null;
    }

    again() {
        return new ExerciseSet({
            exercise_name: this.exercise_name,
            weight: this.weight,
            reps: this.reps
        })
    }
}