import { Component, HostListener } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})

export class HomePageComponent {
  primary = {
    hex: '#5856d6',
    rgb: 'rgb(88, 86, 214)',
  };

  secondary = {
    hex: '#6b7785',
    rgb: 'rgb(107, 119, 133)',
  };

  success = {
    hex: '#1b9e3e',
    rgb: 'rgb(27, 158, 62)',
  };

  danger = {
    hex: '#e55353',
    rgb: 'rgb(229, 83, 83)',
  };

  warning = {
    hex: '#f9b115',
    rgb: 'rgb(249, 177, 21)',
  };
  screenWidth!: number;

  public isExpanded: boolean = false;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router : Router
  ) {
    this.getScreenSize();
  }
  @HostListener('window:resize', ['$event'])
  getScreenSize() {
    this.screenWidth = window.innerWidth;
    // console.log(this.screenWidth);
    if (this.screenWidth <= 959) {
      this.isExpanded = true;
    } else {
      this.isExpanded = false;
    }
  }

  logout(){
    localStorage.clear()
    this.router.navigateByUrl('auth/login')
  }
}
