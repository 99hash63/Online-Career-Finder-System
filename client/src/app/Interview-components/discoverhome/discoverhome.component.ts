import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-discoverhome',
  templateUrl: './discoverhome.component.html',
  styleUrls: ['./discoverhome.component.css']
})
export class DiscoverhomeComponent implements OnInit {

  constructor(private route : Router) { }

  ngOnInit(): void {
    this.CommonInterviewsbtnClick
  }

  CommonInterviewsbtnClick() {
    this.route.navigateByUrl('getcommoninterviews');
};

InterviewGuidelinebtnClick(){
  this.route.navigateByUrl('getinterviewguidlines');
}

SavedQuestionbtnClick(){
  this.route.navigateByUrl('getsavedquestions');
}

}
