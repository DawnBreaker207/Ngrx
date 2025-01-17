import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from "rxjs";
import {inject, Inject} from "@angular/core";
import {select, Store} from "@ngrx/store";
import {AppState} from "../reducers";
import {isLoggedIn} from "./auth.selectors";
import {tap} from "rxjs/operators";

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> => {
  const store = inject(Store<AppState>);
  const router = inject(Router)
  return store.pipe(select(isLoggedIn), tap(loggedIn => {
    if (!loggedIn) {
      router.navigateByUrl('/login');
    }
  }));
};
