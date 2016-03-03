import {Component} from 'angular2/core';
import {HTTP_PROVIDERS}    from 'angular2/http';
import {NgForm}    from 'angular2/common';
import {ExerciseSet}       from './set';
import {SetService} from './set.service';
import {OldExercisesPipe} from './old-exercises.pipe'

@Component({
    selector: 'my-app',
    //template: '<h1>My First Angular 2 App</h1>',
    templateUrl: 'app/app.component.html',
    styles: [`
      h1 { color: red; }
    `],
    pipes: [
        OldExercisesPipe
    ],
    providers: [
        HTTP_PROVIDERS,
        SetService
    ]
})
export class AppComponent {
    constructor(private _setService: SetService) {}

    set: ExerciseSet;
    sets: ExerciseSet[];

    submitting: boolean;

    exercises = [
        'Lateral pulldown',
        'Chest press'
    ]

    ngOnInit() { this.reset(); this.getSets() }

    reset() { this.set = new ExerciseSet() }

    getSets() {
        this._setService.getSets()
            .subscribe(
                sets => { this.sets = sets; console.log(sets) }
            );
    }

    saveSet() {
        console.log(this.set)
        
        var newRecord = !this.set.persisted();
        this.submitting = true;

        this._setService.saveSet(this.set)
            .subscribe(
                set => {
                    this.sets.unshift(set);

                    if (newRecord) {
                        this.again(set);
                    } else {
                        this.reset()
                    }

                    this.submitting = false;
                },
                error => console.log(error)
            )
    }
    
    again(set) {
        this.set = set.again() 
    }
}
