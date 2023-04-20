import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-third-page',
  templateUrl: './third-page.page.html',
  styleUrls: ['./third-page.page.scss'],
})
export class ThirdPagePage implements OnInit {
  user: any;

  constructor() { }

  ngOnInit() {
    //this.user = JSON.parse(localStorage.getItem('user'));
    this.user = localStorage.getItem('email');

  }

}
