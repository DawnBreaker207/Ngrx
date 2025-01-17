import {ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot} from '@angular/router';
import {filter, finalize, first, Observable} from "rxjs";
import {inject} from "@angular/core";
import {select, Store} from "@ngrx/store";
import {AppState} from "../reducers";
import {tap} from "rxjs/operators";
import {loadAllCourses} from "./course.actions";
import {areCoursesLoaded} from "./courses.selectors";

export const coursesResolver: ResolveFn<any> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> => {
    let loading: boolean = false;
    const store = inject(Store<AppState>);
    return store.pipe(
        select(areCoursesLoaded),
        tap((coursesLoaded) => {
            if (!loading && !coursesLoaded) {
                loading = true;
                store.dispatch(loadAllCourses())
            }
        }),
        filter(coursesLoaded => coursesLoaded),
        first(),
        finalize(() => loading = false)
    );
};
