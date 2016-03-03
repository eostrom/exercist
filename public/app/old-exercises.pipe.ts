import {Pipe, PipeTransform} from 'angular2/core';
import {ExerciseSet} from "./set";

@Pipe({name: 'oldExercises', pure: false})
export class OldExercisesPipe implements PipeTransform {
    transform(sets:ExerciseSet[]):ExerciseSet[] {
        var oldestByName = new Map<string, ExerciseSet>();

        sets.forEach(set => {
            var oldestSet = oldestByName.get(set.exercise_name);

            if (!oldestSet || (set.created_at > oldestSet.created_at)) {
                oldestByName.set(set.exercise_name, set);
            }
        })

        return Array.from(oldestByName.values())
            .sort((set1, set2) => set1.created_at - set2.created_at);
    }
}