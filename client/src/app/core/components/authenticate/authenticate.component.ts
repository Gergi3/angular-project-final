import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/auth/+store/models';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.scss']
})
export class AuthenticateComponent implements OnInit {

  
  constructor(
    public userModel: UserModel
  ) { }

  ngOnInit() {
    this.userModel.loadUser();
  }
}
