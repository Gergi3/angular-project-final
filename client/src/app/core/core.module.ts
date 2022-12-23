import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { NavigationComponent } from './components/navigation/navigation.component';
import { FooterComponent } from './components/footer/footer.component';
import { apiInterceptorProvider } from './interceptors/api.interceptor';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthenticateComponent } from './components/authenticate/authenticate.component';
import { ApiCheckComponent } from './components/api-check/api-check.component';
import { ServerMaintenanceComponent } from './components/server-maintenance/server-maintenance.component';
import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
  declarations: [
    NavigationComponent,
    FooterComponent,
    HomeComponent,
    NotFoundComponent,
    AuthenticateComponent,
    ApiCheckComponent,
    ServerMaintenanceComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    SharedModule,

    // Materials
    MatToolbarModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule
  ],
  exports: [
    NavigationComponent,
    FooterComponent,
    AuthenticateComponent,
    ApiCheckComponent,
    ServerMaintenanceComponent,
  ],
  providers: [apiInterceptorProvider],
})
export class CoreModule { }
