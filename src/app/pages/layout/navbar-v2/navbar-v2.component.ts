import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-v2',
  templateUrl: './navbar-v2.component.html',
  styleUrls: ['./navbar-v2.component.scss']
})
export class NavbarV2Component implements OnInit {

  userRole: string;
  userId:string;

  ngOnInit() {
    // Retrieve the user's role from local storage
    this.userRole = localStorage.getItem('role');
    // Retrieve the user id from local storage
    this.userId = localStorage.getItem('userId');
    
  }
  constructor(
    private router : Router
  ) { }

  

   logout(){
    localStorage.clear()
    this.router.navigateByUrl('/auth/login')
  }

}
