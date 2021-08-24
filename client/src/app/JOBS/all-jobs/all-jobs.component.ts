import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JobpostService } from '../jobpost.service';
import { Jobpost } from '../jobpost.model';
import {
  FormGroup,
  FormBuilder,
  FormGroupDirective,
  NgForm,
  FormControl,
  Validators,
  PatternValidator,
} from '@angular/forms';

@Component({
  selector: 'app-all-jobs',
  templateUrl: './all-jobs.component.html',
  styleUrls: ['./all-jobs.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [JobpostService],
})
export class AllJobsComponent implements OnInit {
  closeResult!: string;
  imageError?: string;
  isImageSaved?: boolean;
  cardImageBase64?: string;
  datediff?: number;
  searchTerm!: string;
  industry: string = 'Industry';
  type: string = 'Type';
  _MS_PER_DAY = 1000 * 60 * 60 * 24;

  JobType = new FormControl();
  typeList: string[] = ['All','Full Time', 'Part Time', 'Internship'];

  selectedTypes!: string;

  IndustryOptions = [
    'Industry ',
    'Accounting ',
    'Airlines/Aviation',
    'Alternative Dispute Resolution',
    'Alternative Medicine',
    'Animation',
    'Apparel/Fashion',
    'Architecture/Planning',
    'Arts/Crafts',
    'Automotive',
    'Aviation/Aerospace',
    'Banking/Mortgage',
    'Biotechnology/Greentech',
    'Broadcast Media',
    'Building Materials',
    'Business Supplies/Equipment',
    'Capital Markets/Hedge Fund/Private Equity',
    'Chemicals',
    'Civic/Social Organization',
    'Civil Engineering',
    'Commercial Real Estate',
    'Computer Games',
    'Computer Hardware',
    'Computer Networking',
    'Computer Software/Engineering',
    'Computer/Network Security',
    'Construction',
    'Consumer Electronics',
    'Consumer Goods',
    'Consumer Services',
    'Cosmetics',
    'Dairy',
    'Defense/Space',
    'Design',
    'E-Learning',
    'Education Management',
    'Electrical/Electronic Manufacturing',
    'Entertainment/Movie Production',
    'Environmental Services',
    'Events Services',
    'Executive Office',
    'Facilities Services',
    'Farming',
    'Financial Services',
    'Fine Art',
    'Fishery',
    'Food Production',
    'Food/Beverages',
    'Fundraising',
    'Furniture',
    'Gambling/Casinos',
    'Glass/Ceramics/Concrete',
    'Government Administration',
    'Government Relations',
    'Graphic Design/Web Design',
    'Health/Fitness',
    'Higher Education/Acadamia',
    'Hospital/Health Care',
    'Hospitality',
    'Human Resources/HR',
    'Import/Export',
    'Individual/Family Services',
    'Industrial Automation',
    'Information Services',
    'Information Technology/IT',
    'Insurance',
    'International Affairs',
    'International Trade/Development',
    'Internet',
    'Investment Banking/Venture',
    'Investment Management/Hedge Fund/Private Equity',
    'Judiciary',
    'Law Enforcement',
    'Law Practice/Law Firms',
    'Legal Services',
    'Legislative Office',
    'Leisure/Travel',
    'Library',
    'Logistics/Procurement',
    'Luxury Goods/Jewelry',
    'Machinery',
    'Management Consulting',
    'Maritime',
    'Market Research',
    'Marketing/Advertising/Sales',
    'Mechanical or Industrial Engineering',
    'Media Production',
    'Medical Equipment',
    'Medical Practice',
    'Mental Health Care',
    'Military Industry',
    'Mining/Metals',
    'Motion Pictures/Film',
    'Museums/Institutions',
    'Music',
    'Nanotechnology',
    'Newspapers/Journalism',
    'Non-Profit/Volunteering',
    'Oil/Energy/Solar/Greentech',
    'Online Publishing',
    'Other Industry',
    'Outsourcing/Offshoring',
    'Package/Freight Delivery',
    'Packaging/Containers',
    'Paper/Forest Products',
    'Performing Arts',
    'Pharmaceuticals',
    'Philanthropy',
    'Photography',
    'Plastics',
    'Political Organization',
    'Primary/Secondary Education',
    'Printing',
    'Professional Training',
    'Program Development',
    'Public Relations/PR',
    'Public Safety',
    'Publishing Industry',
    'Railroad Manufacture',
    'Ranching',
    'Real Estate/Mortgage',
    'Recreational Facilities/Services',
    'Religious Institutions',
    'Renewables/Environment',
    'Research Industry',
    'Restaurants',
    'Retail Industry',
    'Security/Investigations',
    'Semiconductors',
    'Shipbuilding',
    'Sporting Goods',
    'Sports',
    'Staffing/Recruiting',
    'Supermarkets',
    'Telecommunications',
    'Textiles',
    'Think Tanks',
    'Tobacco',
    'Translation/Localization',
    'Transportation',
    'Utilities',
    'Venture Capital/VC',
    'Veterinary',
    'Warehousing',
    'Wholesale',
    'Wine/Spirits',
    'Wireless',
    'Writing/Editing',
  ];

  constructor(
    private modalService: NgbModal,
    public jobpostservice: JobpostService
  ) {}

  ngOnInit(): void {
    this.refreshJobList();
    this.setJob(this.jobpostservice.jobs[0]);
  }
  setJob(job: Jobpost) {
    this.jobpostservice.selectedJob = job;
  }

  openScrollableContent(longContent: any) {
    this.modalService.open(longContent, {
      size: 'lg',
      backdrop: 'static',
      scrollable: true,
    });
  }
  refreshJobList() {
    this.jobpostservice.getalljobs().subscribe((res) => {
      this.jobpostservice.jobs = res as Jobpost[];
    });
  }
  calcDateDiff(date: any) {
    var today = new Date();
    var s = new Date(date);

    var diff = Math.abs(today.getTime() - s.getTime());
    var diffDays = Math.ceil(diff / (1000 * 3600 * 24));
    return diffDays + 'd';
  }
  achiring() {
    if (this.jobpostservice.selectedJob.activelyHiring == 'Yes') {
      return true;
    }
    return false;
  }
}
