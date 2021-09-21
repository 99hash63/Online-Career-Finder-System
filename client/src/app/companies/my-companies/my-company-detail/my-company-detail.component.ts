import { Component, OnInit } from '@angular/core';
import { CompaniesService } from '../../companies.service';
import { MyCompanyDetail } from '../../myCompanyDetail';

@Component({
  selector: 'app-my-company-detail',
  templateUrl: './my-company-detail.component.html',
  styleUrls: ['./my-company-detail.component.css'],
})
export class MyCompanyDetailComponent implements OnInit {
  public myCompanyId: string;
  public myCompanyDetail: MyCompanyDetail;
  public serverErrorMessages: string;
  constructor(public companiesService: CompaniesService) {}

  ngOnInit(): void {
    this.myCompanyId = this.companiesService.getMyCompanyId();
    this.companiesService.getSingleCompanyDB(this.myCompanyId).subscribe(
      (res) => {
        this.myCompanyDetail = res['data'];
        console.log(this.myCompanyDetail);
      },
      (err) => {
        this.serverErrorMessages = err.error.join('<br/>');
      }
    );
  }
}
