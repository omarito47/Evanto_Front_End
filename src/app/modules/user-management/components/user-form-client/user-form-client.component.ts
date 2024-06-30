import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { User, UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-user-form-client',
  templateUrl: './user-form-client.component.html',
  styleUrls: ['./user-form-client.component.scss']
})
export class UserFormClientComponent implements OnInit {
  user: User;
  isFromUserlistPage:String;
  constructor(
    private userService: UsersService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar // Inject MatSnackBar
  ) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
     this.isFromUserlistPage =localStorage.getItem('fromListUser');

    if (userId) {
      this.userService.getUserById(userId).subscribe(user => {
        this.user = user;
      });
    }
  }

  onSubmit(form: NgForm): void {
    this.userService.updateUser(this.user._id!, this.user).subscribe(() => {
      this.snackBar.open('User updated successfully!', 'Close', {
        
        duration: 3000, // Duration in milliseconds
      });

      this.router.navigate(['/nav2/edit-user/'+this.user._id]);
      
     
    });
  }

}
