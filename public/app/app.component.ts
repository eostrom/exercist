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

    set: ExerciseSet;
    sets: ExerciseSet[];

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
        this._setService.saveSet(this.set)
            .subscribe(
                set => this.reset(),
                error => console.log(error)
            )
    }
}
