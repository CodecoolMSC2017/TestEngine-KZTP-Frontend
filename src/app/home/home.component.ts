import { Component, OnInit } from '@angular/core';
import { Test } from '../Test';
import { News } from '../News';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  popularTests:Test[];
  news:News[];
  constructor() { }

  ngOnInit() {
  }

}
