import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CompaniesService } from '../companies.service';
import { Company } from '../company.model';

@Component({
  selector: 'app-my-companies',
  templateUrl: './my-companies.component.html',
  styleUrls: ['./my-companies.component.css'],
})
export class MyCompaniesComponent implements OnInit {
  companies: Company[] = [];
  private companiesSub!: Subscription;
  serverErrorMessages: string;

  constructor(public companiesService: CompaniesService) {}

  ngOnInit() {
    this.companiesService.getMyCompaniesDB().subscribe(
      (res) => {
        this.companies = res['data'] as Company[];
      },
      (err) => {
        this.serverErrorMessages = err.error.join('<br/>');
      }
    );
  }

  onSave(id: any) {
    this.companiesService.getSingleCompany(id.value);
  }
}
