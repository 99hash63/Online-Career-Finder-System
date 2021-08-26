import { Component, OnInit } from '@angular/core';

import { UserService } from './user.service';
import { NgForm } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService],
})
export class RegisterComponent implements OnInit {
  registerImg: string = '../../assets/images/signup-image.jpg';
  cookieValue: any;

  constructor(
    public userService: UserService,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {}

  resetForm(form?: NgForm) {
    if (form) form.reset();
    this.userService.selectedUser = {
      _id: '',
      name: '',
      email: '',
      password: '',
      createdAt: '',
    };
  }
  onSubmit(form: NgForm) {
    console.log('onSubmit clicked');
    this.userService.postUser(form.value).subscribe((res) => {
      console.log();
      // this.cookieService.set(res.cookie); // To Set Cookie
      // this.cookieValue = this.cookieService.get('name'); // To Get Co
    });
  }
}
