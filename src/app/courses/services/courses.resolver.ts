import {ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot} from '@angular/router';
import {filter, first, Observable} from "rxjs";
import {inject} from "@angular/core";
import {CourseEntityService} from "./course-entity.service";
import {map, tap} from "rxjs/operators";

export const coursesResolver: ResolveFn<boolean> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> => {
    const coursesService = inject(CourseEntityService)

    return coursesService.loaded$.pipe(
        tap(loaded => {
            if (!loaded) {
                coursesService.getAll()
            }
        }),
        filter(loaded => !!loaded),
        first())
};
