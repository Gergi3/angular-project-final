import { Component, Input } from '@angular/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {

  @Input() color: 'primary' | 'accent' | 'warn' = 'primary';
  @Input() mode: ProgressSpinnerMode = 'indeterminate';
  @Input() value = 50;
}
