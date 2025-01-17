import {ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot} from '@angular/router';
import {finalize, first, Observable} from "rxjs";
import {inject} from "@angular/core";
import {Store} from "@ngrx/store";
import {AppState} from "../reducers";
import {tap} from "rxjs/operators";
import {loadAllCourses} from "./course.actions";

export const coursesResolver: ResolveFn<any> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> => {
    let loading: boolean = false;
    const store = inject(Store<AppState>);
    return store.pipe(tap(() => {
            if (!loading) {
                loading = true;
                store.dispatch(loadAllCourses())
            }
        })
        ,
        first(),
        finalize(() => loading = false)
    );
};
