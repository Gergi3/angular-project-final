import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LogoutComponent } from './logout/logout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { StoreModule } from '@ngrx/store';
import { userModuleStoreName as authModuleStoreName } from 's-+store-example/reducers';
import { authReducers } from './+store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { AuthModuleEffects } from './+store/effects';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    LogoutComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,

    // Store
    StoreModule.forFeature(authModuleStoreName, authReducers),
    EffectsModule.forFeature([AuthModuleEffects]),

    // Materials
    MatInputModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatButtonModule
  ]
})
export class AuthModule { }
