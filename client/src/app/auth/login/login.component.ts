import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { first } from 'rxjs';
import { ErrorHelper } from 'src/app/core/helpers/error.helper';
import { IUserLoginInfo } from 'src/app/core/interfaces/user';
import { emailValidators, passwordValidators } from 'src/app/core/validators/reactive-validators';
import { UserModel } from '../+store/models';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  isLoggingIn$ = this.userModel.isLoggingIn$;

  loginForm = this.fb.group({
    email: ['', emailValidators],
    password: ['', passwordValidators]
  });

  loginFailure: null | string = null;

  constructor(
    private fb: FormBuilder,
    private userModel: UserModel,
    private router: Router,
    private errorHelper: ErrorHelper
  ) { }

  loginHandler() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginForm.value;
    const userInfo: IUserLoginInfo = {
      email: email!,
      password: password!
    };
    this.userModel.loginUser(userInfo);

    this.userModel.loginUserSuccess$.pipe(first())
      .subscribe(() => this.router.navigate(['/']));

    this.userModel.loginUserFailure$.pipe(first())
      .subscribe(({ error }) => this.loginFailure = this.errorHelper.getApiError(error));
  }

  cancelHandler() {
    this.router.navigate(['/']);
  }
}
