export class ExerciseSet {
    constructor(attributes = {}) { Object.assign(this, attributes) }

    id: number;

    persisted() : boolean {
        return this.id != null;
    }
}