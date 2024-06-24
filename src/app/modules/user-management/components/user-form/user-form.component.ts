import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User, UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  user: User;
  isEditMode: boolean = false;
  isFromUserlistPage: string;

  constructor(
    private userService: UsersService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar // Inject MatSnackBar
  ) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    this.isFromUserlistPage = localStorage.getItem('fromListUser');

    if (userId) {
      this.isEditMode = true;
      this.userService.getUserById(userId).subscribe(user => {
        this.user = user;
      });
    }
  }

  onSubmit(form: NgForm): void {
    if (this.isEditMode) {
      this.userService.updateUser(this.user._id!, this.user).subscribe(() => {
        this.snackBar.open('User updated successfully!', 'Close', {
          duration: 3000, // Duration in milliseconds
          panelClass:['custom-snackbar']
        });

        if (this.isFromUserlistPage === "true") {
          this.router.navigate(['/liste-user']);
          localStorage.setItem('fromListUser', "false");
        } else {
          this.router.navigate(['/users/edit/' + this.user._id]);
        }
      });
    } else {
      this.userService.createUser(this.user).subscribe(() => {
        this.router.navigate(['/liste-user']);
      });
    }
  }
}
