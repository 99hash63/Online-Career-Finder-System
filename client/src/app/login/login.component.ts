import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginImg:string = "../../assets/images/signin-image.jpg";
  loginIcons:string = "../../assets/fonts/material-icon/css/material-design-iconic-font.min.css";

  constructor() { }

  ngOnInit(): void {
  }

}
