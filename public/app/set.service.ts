import {Injectable} from "angular2/core";
import {Http, Response} from "angular2/http";
import {Observable} from "rxjs/Observable";
import {ExerciseSet} from './set'

@Injectable()
export class SetService {
    constructor(private http: Http) {}

    private _setsUrl = '/api/sets'; // leading slash?

    addSet(set: ExerciseSet) : Observable<Set> {
        return this.http.post(this._setsUrl, JSON.stringify(set))
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