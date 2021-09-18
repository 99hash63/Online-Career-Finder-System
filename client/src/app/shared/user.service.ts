import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user.model';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  selectedUser: User = {
    name: '',
    email: '',
    password: '',
  };
  constructor(public http: HttpClient) {}

  //function to register user
  postUser(user: User) {
    return this.http.post(environment.apiBaseUrl + '/auth/register', user);
  }

  //function to login user
  login(authCredentials) {
    return this.http.post(
      environment.apiBaseUrl + '/auth/login',
      authCredentials
    );
  }

  //function to set token response in the browser
  setToken(token: string) {
    localStorage.setItem('token', token);
  }
}
