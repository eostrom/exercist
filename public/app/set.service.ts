import {Injectable} from "angular2/core";
import {Http, Response, Headers} from "angular2/http";
import {Observable} from "rxjs/Observable";
import {ExerciseSet} from './set'

@Injectable()
export class SetService {
    constructor(private http: Http) {}

    private _setsUrl = '/exercise_sets';

    private jsonToSet(json) : ExerciseSet {
        return new ExerciseSet(
            Object.assign({}, json, {
                weight: Number.parseFloat(json.weight),
                created_at: Date.parse(json.created_at)
            })
        )
    }

    getSets() : Observable<ExerciseSet[]> {
        return this.http.get(this._setsUrl)
            .map(res =>
                res.json().map(this.jsonToSet)
            )
            .catch(this.handleError);
    }

    saveSet(set: ExerciseSet) : Observable<ExerciseSet> {
        var jsonHeaders = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application.json'
        })

        var action = set.persisted() ? 'patch' : 'post';
        var url = this._setsUrl;
        if (set.persisted()) { url += `/${set.id}` }

        return this.http[action](url,
            JSON.stringify({exercise_set: set}),
            {
                headers: jsonHeaders
            }
        )
            .map(res => this.jsonToSet(res.json()))
            .catch(this.handleError)
    }

    private handleError (error: Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}