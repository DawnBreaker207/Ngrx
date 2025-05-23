import {createReducer, on} from '@ngrx/store';
import {compareCourses, Course} from "../model/course";
import {createEntityAdapter, EntityState} from "@ngrx/entity";
import {CourseActions} from "../action-types";


export interface CoursesState extends EntityState<Course> {
  allCoursesLoaded: boolean
}

export const adapter = createEntityAdapter<Course>(
  {
    sortComparer: compareCourses
  }
)

export const initialCourseState = adapter.getInitialState({
  allCoursesLoaded: false,
})

export const coursesReducer = createReducer(
  initialCourseState,
  on(CourseActions.allCoursesLoaded, (state, action) =>
    adapter.addMany(action.courses, {...state, allCoursesLoaded: true})
  ),
  on(CourseActions.courseUpdated, (state, action) => adapter.updateOne(action.update, state))
)

export const {selectAll} = adapter.getSelectors();
