import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {Store} from "@ngrx/store";

import {AuthService} from "../auth.service";
import {tap} from "rxjs/operators";
import {noop} from "rxjs";
import {Router} from "@angular/router";
import {AuthState} from "../reducers/auth.reducers";
import {login} from "../auth.action";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: false
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private store: Store<AuthState>,
    private router: Router) {

    this.form = fb.group({
      email: ['test@angular-university.io', [Validators.required]],
      password: ['test', [Validators.required]]
    });

  }

  ngOnInit() {

  }

  login() {
    const val = this.form.value;

    this.auth.login(val.email, val.password).pipe(tap(user => {
      console.log(user)
      this.store.dispatch(login({user}))
      this.router.navigateByUrl('/courses')
    })).subscribe(noop, () => alert('Login failed'))
  }

}
