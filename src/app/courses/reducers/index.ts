import {isDevMode} from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import {Course} from "../model/course";
import {EntityState} from "@ngrx/entity";


export interface CoursesState extends EntityState<Course> {
  entities: { [key: number]: Course }
  ids: number[];
}

export const reducers: ActionReducerMap<CoursesState> = {};


