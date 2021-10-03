import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  showSuccessMessage: boolean;
  serverErrorMessages: string;

  constructor(public userService: UserService, private router: Router) {}

  ngOnInit(): void {}
  onSubmit(form: NgForm) {
    this.userService.postUser(form.value).subscribe(
      (res) => {
        this.showSuccessMessage = true;
        this.userService.setToken(res['token']);
        this.resetForm(form);
        setTimeout(() => {
          this.showSuccessMessage = false;
          this.router.navigateByUrl('/').then(() => {
            window.location.reload();
          });
        }, 1500);
      },
      (err) => {
        if (err.status === 422) {
          this.serverErrorMessages = err.error.join('<br/>');
        } else this.serverErrorMessages = 'Opps.. Something went wrong';
      }
    );
  }

  resetForm(form: NgForm) {
    this.userService.selectedUser = {
      name: '',
      email: '',
      password: '',
    };
    form.resetForm();
    this.serverErrorMessages = '';
  }
}
