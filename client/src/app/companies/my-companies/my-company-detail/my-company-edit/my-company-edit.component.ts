import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CompaniesService } from 'src/app/companies/companies.service';
import { MyCompanyDetail } from 'src/app/companies/myCompanyDetail';

@Component({
  selector: 'app-my-company-edit',
  templateUrl: './my-company-edit.component.html',
  styleUrls: ['./my-company-edit.component.css'],
})
export class MyCompanyEditComponent implements OnInit {
  @Input() myCompanyDetail: MyCompanyDetail;

  company: MyCompanyDetail = {
    _id: '',
    industry: '',
    emp_count: '',
    founded: '',
    website: '',
    revenue: 0,
    address: '',
    location: Object[''],
    country: '',
    city: '',
    title: '',
    description: '',
    logo: '',
    coverPhoto: '',
    otherPhotos: [''],
    isPublic: false,
    createdAt: '',
    createdBy: '',
    slug: '',
  };
  constructor(private companyService: CompaniesService) {}

  ngOnInit(): void {
    this.company._id = this.myCompanyDetail._id;
    this.company.industry = this.myCompanyDetail.industry;
    this.company.emp_count = this.myCompanyDetail.emp_count;
    this.company.founded = this.myCompanyDetail.founded;
    this.company.website = this.myCompanyDetail.website;
    this.company.revenue = this.myCompanyDetail.revenue;
    this.company.address = this.myCompanyDetail.address;
    this.company.location = this.myCompanyDetail.location;
    this.company.country = this.myCompanyDetail.country;
    this.company.city = this.myCompanyDetail.city;
    this.company.title = this.myCompanyDetail.title;
    this.company.description = this.myCompanyDetail.description;
    this.company.logo = this.myCompanyDetail.logo;
    this.company.coverPhoto = this.myCompanyDetail.coverPhoto;
    this.company.otherPhotos = this.myCompanyDetail.otherPhotos;
    this.company.isPublic = this.myCompanyDetail.isPublic;
    this.company.createdAt = this.myCompanyDetail.createdAt;
    this.company.createdBy = this.myCompanyDetail.createdBy;
    this.company.slug = this.myCompanyDetail.slug;
  }

  onSubmit() {
    this.companyService.updateCompany(this.company).subscribe(
      (res) => {
        alert('success!');
        window.location.reload();
      },
      (err) => {
        alert('error!');
      }
    );
  }
}
