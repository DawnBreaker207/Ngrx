import {createFeatureSelector, createSelector} from "@ngrx/store";
import * as fromCourses from './reducers/course.reducers'
import {CoursesState} from './reducers/course.reducers'

export const selectCoursesState = createFeatureSelector<CoursesState>("courses")

export const selectAllCourses = createSelector(
  selectCoursesState,
  fromCourses.selectAll
)
export const selectBeginnerCourses = createSelector(
  selectAllCourses,
  courses => courses.filter(course => course.category === "BEGINNER")
)

export const selectAdvancedCourses = createSelector(
  selectAllCourses,
  courses => courses.filter(course => course.category === "ADVANCED")
)

export const selectPromoTotal = createSelector(
  selectAllCourses,
  courses => courses.filter(course => course.promo).length
)

export const areCoursesLoaded = createSelector(
  selectCoursesState,
  (state: CoursesState) => state.allCoursesLoaded
)
