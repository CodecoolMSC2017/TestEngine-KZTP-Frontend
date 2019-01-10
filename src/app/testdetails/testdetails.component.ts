import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Inject} from '@angular/core';


import { Test } from '../Test';
import { TestService } from '../test.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TestreportService } from '../testreport.service';

export interface ReportData {
  testId: number;
}

@Component({
  selector: 'app-testdetails',
  templateUrl: './testdetails.component.html',
  styleUrls: ['./testdetails.component.css']
})
export class TestdetailsComponent implements OnInit {

  test: Test;
  testId: number;
  testTaken: boolean;
  testVoted: boolean;
  testRated: boolean;
  constructor(private testService: TestService,private route: ActivatedRoute, private router: Router,public dialog: MatDialog) {
    this.route.params.subscribe(params => {
      this.testId = params.id;
    });
   }

  ngOnInit() {
    this.testService.getTest(this.testId).subscribe(t => this.test = t);
    this.testService.isTestDone(this.testId).subscribe(td => this.testTaken = td);
    this.testService.isTestRated(this.testId).subscribe(tr => this.testRated = tr);
    this.testService.isTestVoted(this.testId).subscribe(tv => this.testVoted = tv);

  }
  takeTest(){
    this.router.navigate(['test/take/'+this.testId]);
  }

  liveRate(value){
    this.testService.sendLiveRate(this.testId,value).subscribe(rating =>this.test.rating = rating);
  }
  poolRate(value){

    if(value == "positive"){
      this.testService.sendPoolRate(this.testId,"positive").subscribe(poolRating => this.test.poolRating = poolRating);
    }
    else if(value == "negative"){
      this.testService.sendPoolRate(this.testId,"negative").subscribe(poolRating => this.test.poolRating = poolRating);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(TestReportDialog, {
      width: '350px',
      height:'300px',
      data: {testId: this.testId}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }


}

@Component({
  selector: 'testreportdialog',
  templateUrl: 'testreportdialog.html',
})
export class TestReportDialog {

  description:String="language";
  userdescription:String="";

  constructor(
    public dialogRef: MatDialogRef<TestReportDialog>,
    @Inject(MAT_DIALOG_DATA) public data: ReportData,private testreportService:TestreportService) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSendReportClick() {
    this.testreportService.reportTest(this.data.testId,this.description,this.userdescription).subscribe(any => console.log(any));
    this.dialogRef.close();
  }

}
