import {Injectable} from "angular2/core";
import {Http, Response, Headers} from "angular2/http";
import {Observable} from "rxjs/Observable";
import {ExerciseSet} from './set'

@Injectable()
export class SetService {
    constructor(private http: Http) {}

    private _setsUrl = '/exercise_sets.json';

    getSets() : Observable<ExerciseSet[]> {
        return this.http.get(this._setsUrl)
            .map(res =>
                <ExerciseSet[]> res.json().map(set => {
                    set.weight = Number.parseFloat(set.weight);
                    set.created_at = Date.parse(set.created_at);
                    return set
                })
            )
            .catch(this.handleError);
    }

    addSet(set: ExerciseSet) : Observable<ExerciseSet> {
        var jsonHeaders = new Headers({
            'Content-Type': 'application/json'
        })

        return this.http.post(this._setsUrl,
            JSON.stringify({exercise_set: set}),
            {
                headers: jsonHeaders
            }
        )
            .map(res => <ExerciseSet> res.json().data)
            .catch(this.handleError)
    }

    private handleError (error: Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}