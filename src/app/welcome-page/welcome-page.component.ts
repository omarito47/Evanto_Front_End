import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {
ngOnInit(): void {
  }
  constructor(
    private router : Router
  ) { }

  

   login(){
    localStorage.clear()
    this.router.navigateByUrl('/auth/login')
  }
  

}
