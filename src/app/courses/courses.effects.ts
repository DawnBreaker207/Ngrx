import {Inject, Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {CourseActions} from "./action-types";
import {CoursesHttpService} from "./services/courses-http.service";
import {concatMap} from "rxjs";
import {map} from "rxjs/operators";
import {allCoursesLoaded} from "./course.actions";

@Injectable()
export class CoursesEffects {

  constructor(private actions$: Actions, private coursesHttpService: CoursesHttpService) {
  }

  loadCourses4 = createEffect(() => this.actions$.pipe(
    ofType(CourseActions.loadAllCourses),
    concatMap(action => this.coursesHttpService.findAllCourses()),
    map(courses => allCoursesLoaded({courses}))
  ))

  saveCourse$ = createEffect(() => this.actions$.pipe(
    ofType(CourseActions.courseUpdated),
    concatMap(action => this.coursesHttpService.saveCourse(action.update.id, action.update.changes))
  ), {dispatch: false})
}
