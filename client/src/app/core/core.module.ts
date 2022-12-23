import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { SharedModule } from '../shared/shared.module';
import { ApiCheckComponent } from './components/api-check/api-check.component';
import { AuthenticateComponent } from './components/authenticate/authenticate.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ServerMaintenanceComponent } from './components/server-maintenance/server-maintenance.component';
import { apiInterceptorProvider } from './interceptors/api.interceptor';

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
