import { Component, NgModule, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  userEmail: string = '';
  constructor(private router: Router, public userService: UserService) {}

  ngOnInit(): void {
    this.userService.isLoggedIn();
    this.getProfile();
  }

  hasRoute(route: String) {
    return this.router.url === route;
  }

  changeHeader() {}

  //function to get user profile
  getProfile() {
    this.userService.getProfile().subscribe(
      (res) => {
        console.log(res['email']);
        this.userEmail = res['email'];
      },
      (err) => {
        console.error(err);
        this.userEmail = '';
      }
    );
  }

  //function to logout user
  logout() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Confirm only if you really want to log out of the system!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, log out!',
      cancelButtonText: 'No, hang on',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteToken();
        window.location.reload();
      }
    });
  }
}
