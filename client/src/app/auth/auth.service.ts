import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { IUser, IUserLoginInfo, IUserRegisterInfo } from '../core/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  register(userInfo: IUserRegisterInfo) {
    return this.http.post<IUser>('/api/register', userInfo);
  }

  login(userInfo: IUserLoginInfo) {
    return this.http.post<IUser>('/api/login', userInfo);
  }

  logout() {
    return this.http.post<never>('/api/logout', {});
  }

  getCurrentProfile() {
    return this.http.get<IUser>('/api/users/profile');
  }
}
