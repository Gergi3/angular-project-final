import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { confirmPasswordsValidator } from 'src/app/core/validators/confirm-passwords.validator';
import { emailValidators, passwordValidators, phoneNumberValidators, rePasswordValidators, usernameValidators } from 'src/app/core/validators/reactive-validators';
import { UserModel } from '../+store/models';
import { IUserRegisterInfo } from 'src/app/core/interfaces/user';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { ErrorHelper } from 'src/app/core/helpers/error.helper';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  isRegistering$ = this.userModel.isRegistering$;

  registerForm = this.fb.group({
    email: ['', emailValidators],
    username: ['', usernameValidators],
    passwords: this.fb.group({
      password: ['', passwordValidators],
      rePassword: ['', rePasswordValidators],
    }, { validator: confirmPasswordsValidator }),
    phoneNumber: ['', phoneNumberValidators],
    isMale: ''
  });

  registerFailure: null | string = null;

  get unconfirmedPasswords() {
    return this.registerForm.get('passwords')?.hasError('confirmPasswords');
  }

  constructor(
    private fb: FormBuilder,
    private userModel: UserModel,
    private router: Router,
    private errorHelper: ErrorHelper
  ) { }

  registerHandler() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const { email, username, passwords: { password, }, phoneNumber, isMale } = this.registerForm.value;

    const userInfo: IUserRegisterInfo = {
      email: email!,
      username: username!,
      password: password!,
      phoneNumber: phoneNumber || null,
      isMale: isMale === null || isMale === '' || isMale === undefined ? null : !!isMale
    }
    this.userModel.registerUser(userInfo);

    this.userModel.registerUserSuccess$.pipe(first())
      .subscribe(() => this.router.navigate(['/']));

    this.userModel.registerUserFailure$.pipe(first())
      .subscribe(({ error }) => this.registerFailure = this.errorHelper.getApiError(error));
  }

  cancelHandler() {
    this.router.navigate(['/']);
  }
}
