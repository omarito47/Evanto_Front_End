import { Component } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  userId: string | null;
  token: string | null;

  constructor() {
    this.userId = localStorage.getItem('userId');
    this.token = localStorage.getItem('token');

    this.displayUserInfo();
  }

  displayUserInfo() {
    console.log('User ID:', this.userId);
    console.log('Token:', this.token);
  }

  // Other methods and logic for the home page
}