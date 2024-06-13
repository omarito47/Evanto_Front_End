import { Component, HostListener } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  screenWidth!: number;
  userRole: string;
  userId: string;
  userName: string;

  ngOnInit() {
    // Retrieve the user's role from local storage
    this.userRole = localStorage.getItem('role');
    // Retrieve the user id from local storage
    this.userId = localStorage.getItem('userId');
    //set the user name
    this.userService.getUserById(this.userId).subscribe((user) => {
      this.userName = user.name;
    });
  }
  public isExpanded: boolean = false;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private userService: UsersService // Inject UserService for user name retrieval
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

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/auth/login');
  }
}
