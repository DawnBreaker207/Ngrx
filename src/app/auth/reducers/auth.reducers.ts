import { createReducer, on } from '@ngrx/store';
import { User } from '../model/user.model';
import { AuthActions } from '../action-types';

// Auth model
export interface AuthState {
  user?: User;
}

// Initial state
export const initialAuthState: AuthState = {
  user: undefined,
};

// Reducer
export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.login, (state, action) => {
    return {
      user: action.user,
    };
  }),

  on(AuthActions.logout, (state, action) => {
    return {
      user: undefined,
    };
  })
);
