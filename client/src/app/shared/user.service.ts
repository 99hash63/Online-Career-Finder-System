import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user.model';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  //variable used in header component
  isLoggedInVariable: boolean = false;
  selectedUser: User = {
    name: '',
    email: '',
    password: '',
  };

  noAuthHeader = {
    headers: new HttpHeaders({ NoAuth: 'True' }),
  };
  constructor(public http: HttpClient) {}

  //function to register user
  postUser(user: User) {
    return this.http.post(
      environment.apiBaseUrl + '/auth/register',
      user,
      this.noAuthHeader
    );
  }

  //function to login user
  login(authCredentials) {
    return this.http.post(
      environment.apiBaseUrl + '/auth/login',
      authCredentials,
      this.noAuthHeader
    );
  }

  //function to set token response in the browser
  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  //get token from localstorage
  getToken() {
    return localStorage.getItem('token');
  }

  //delete token from local storage
  deleteToken() {
    localStorage.removeItem('token');
  }

  //get payload from token
  getUserPayload() {
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    } else {
      return null;
    }
  }

  //check if user is logged in
  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload) {
      this.isLoggedInVariable = true;
      return userPayload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }
}
