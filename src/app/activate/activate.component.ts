import { Component, OnInit } from '@angular/core';
import { ActivationService } from '../activation.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.css']
})
export class ActivateComponent implements OnInit {

  token:String;

  constructor(private activationService:ActivationService,private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
    this.token = params.token;
  });}

  ngOnInit() {
    this.activationService.activateUser(this.token).subscribe();
  }

}
