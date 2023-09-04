import {Injectable} from "@angular/core";
import {Actions} from "@ngrx/effects";
import {HttpClient} from "@angular/common/http";

@Injectable()

export class AuthEffects {


  constructor(private actions$: Actions, private http: HttpClient) {
  }
}
