import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  showSuccessMessage: boolean;
  serverErrorMessages: string;

  constructor(public userService: UserService) {}

  ngOnInit(): void {}
  onSubmit(form: NgForm) {
    this.userService.postUser(form.value).subscribe(
      (res) => {
        this.showSuccessMessage = true;
        setTimeout(() => (this.showSuccessMessage = false), 3000);
        this.resetForm(form);
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
