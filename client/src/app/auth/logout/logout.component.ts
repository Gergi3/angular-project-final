import { Component, OnInit } from '@angular/core';
import { UserModel } from '../+store/models';
import { first } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(
    private userModel: UserModel,
    private router: Router
  ) { }

  ngOnInit() {
    this.userModel.logoutUser();
    this.userModel.logoutUserSuccess$.pipe(first())
      .subscribe(() => this.router.navigate(['/auth/login']));

    this.userModel.logoutUserFailure$.pipe(first())
      .subscribe(() => this.router.navigate(['/auth/login']));
  }
}
