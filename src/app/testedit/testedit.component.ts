import { Component, OnInit } from '@angular/core';
import { TestService } from '../test.service';
import { ActivatedRoute } from '@angular/router';
import { Test } from '../Test';
import { TesteditService } from '../testedit.service';
import { Question } from '../question';

@Component({
  selector: 'app-testedit',
  templateUrl: './testedit.component.html',
  styleUrls: ['./testedit.component.css']
})
export class TesteditComponent implements OnInit {

  testId:number;
  test:Test;
  questions:Question[];
  message: String;
  showMessage: boolean = false;
  isError: boolean = false;

  constructor(private testService:TestService,private route: ActivatedRoute,private testeditService:TesteditService) {
    this.route.params.subscribe(params => {
      this.testId = params.id;
    });
  }

  ngOnInit() {
    this.testService.getTest(this.testId).subscribe(t => this.test = t);
    this.testeditService.getTestToEdit(this.testId).subscribe(questions => this.questions = questions);

  }

  editTest() {
    this.testeditService.editTest(this.testId,this.questions).subscribe(()=>{
      this.showMessage= true;
      this.isError = false;
      this.message = "Test edited!";
    },
    (error)=>{
      this.showMessage= true;
      this.isError = true;
      this.message = error.error.message;
    });
  }

}
