import { Component, NgModule, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxTypedJsComponent, NgxTypedJsModule } from 'ngx-typed-js';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private router: Router,
    public NgxTypedJsModule: NgxTypedJsModule
  ) {}

  ngOnInit(): void {}

  hasRoute(route: String) {
    return this.router.url === route;
  }

  changeHeader() {}
}
