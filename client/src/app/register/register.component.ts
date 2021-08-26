import { Component, OnInit } from '@angular/core';

import { UserService } from './user.service';
import { NgForm } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

declare var M: any;
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService],
})
export class RegisterComponent implements OnInit {
  registerImg: string = '../../assets/images/signup-image.jpg';

  constructor(public userService: UserService, private cookie: CookieService) {}

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
    this.userService.postUser(form.value).subscribe((res) => {
      console.log(res);
      M.toast({ html: 'saved successfully', classes: 'rounded' });
    });
  }
}
