import {Component} from 'angular2/core';
import {HTTP_PROVIDERS}    from 'angular2/http';
import {NgForm}    from 'angular2/common';
import {ExerciseSet}       from './set';
import {SetService} from './set.service';

@Component({
    selector: 'my-app',
    //template: '<h1>My First Angular 2 App</h1>',
    templateUrl: 'app/app.component.html',
    styles: [`
      h1 { color: red; }
    `],
    providers: [
        HTTP_PROVIDERS,
        SetService
    ]
})
export class AppComponent {
    constructor(private _setService: SetService) {}

    set = new ExerciseSet('Chest press', 80, 10)
    sets: ExerciseSet[];

    exercises = [
        'Lateral pulldown',
        'Chest press'
    ]

    ngOnInit() { this.getSets() }

    getSets() {
        this._setService.getSets()
            .subscribe(
                sets => { this.sets = sets; console.log(sets) }
            );
    }

    addSet() {
        console.log(this.set)
        this._setService.addSet(this.set)
            .subscribe(
                set => console.log(set),
                error => console.log(error)
            )
    }
}
