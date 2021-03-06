import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  serverErrorMessages: string;
  showSuccessMessage: boolean;

  constructor(public userService: UserService, private router: Router) {}

  model = {
    email: '',
    password: '',
  };

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    //calling login method to login user
    this.userService.login(form.value).subscribe(
      (res) => {
        this.userService.setToken(res['token']);
        this.showSuccessMessage = true;
        this.resetForm(form);
        setTimeout(() => {
          this.showSuccessMessage = false;
          this.router.navigateByUrl('/').then(() => {
            window.location.reload();
          });
        }, 1500);
      },
      (err) => {
        this.serverErrorMessages = err.error.join('<br/>');
      }
    );
  }

  //function to reset form
  resetForm(form: NgForm) {
    this.model = {
      email: '',
      password: '',
    };
    form.resetForm();
    this.serverErrorMessages = '';
    return true;
  }
}
