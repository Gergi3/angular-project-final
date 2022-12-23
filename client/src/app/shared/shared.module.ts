import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { PageTitleComponent } from './page-title/page-title.component';
import { SpinnerComponent } from './spinner/spinner.component';


@NgModule({
  declarations: [
    PageTitleComponent,
    SpinnerComponent,
  ],
  imports: [
    CommonModule,

    // Materials
    MatProgressSpinnerModule
  ],
  exports: [
    PageTitleComponent,
    SpinnerComponent
  ]
})
export class SharedModule { }
