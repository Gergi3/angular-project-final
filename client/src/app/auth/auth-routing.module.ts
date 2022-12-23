import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './register/register.component';
import { IsNotAuthenticatedGuard } from '../core/guards/is-not-authenticated.guard';
import { IsAuthenticatedGuard } from '../core/guards/is-authenticated.guard';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [IsNotAuthenticatedGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [IsNotAuthenticatedGuard]
  },
  {
    path: 'logout',
    component: LogoutComponent,
    canActivate: [IsAuthenticatedGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
