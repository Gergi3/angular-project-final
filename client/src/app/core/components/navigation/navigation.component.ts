import { Component } from '@angular/core';

import { faArrowDown } from '@fortawesome/free-solid-svg-icons';

import { UserModel } from 'src/app/auth/+store/models';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

  isLoggedIn$ = this.userModel.isLoggedIn$;
  
  arrowDownIcon = faArrowDown;

  constructor(
    private userModel: UserModel
  ) { }
}
