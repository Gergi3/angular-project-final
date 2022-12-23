import { Component } from '@angular/core';

import { UserModel } from 'src/app/auth/+store/models';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

  isLoggedIn$ = this.userModel.isLoggedIn$;

  constructor(
    private userModel: UserModel
  ) { }
}
