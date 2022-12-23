import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

import { catchError } from 'rxjs';

@Component({
  selector: 'api-check',
  templateUrl: './api-check.component.html',
  styleUrls: ['./api-check.component.scss']
})
export class ApiCheckComponent {

  apiIsUp: boolean | null = null;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.http.get('/api/test')
      .pipe(catchError(err => {
        this.apiIsUp = false;
        return err;
      })) // TODO: Create errors log for devs and write to it
      .subscribe(() => this.apiIsUp = true);
  }
}
