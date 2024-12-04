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
  userBody={
    name: '',
    email: '',
    age: 0,
    address: '',
    phoneNumber: ''
  };
  isFromUserlistPage:String;
  userId: string;
  constructor(
    private userService: UsersService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar // Inject MatSnackBar
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
     this.isFromUserlistPage =localStorage.getItem('fromListUser');

    if (this.userId) {
      this.userService.getUserById(this.userId).subscribe(user => {
        this.userBody.address = user.address;
        this.userBody.age = user.age;
        this.userBody.email = user.email;
        this.userBody.name = user.name;
        this.userBody.phoneNumber = user.phoneNumber;

      });
    }
  }

  onSubmit(form: NgForm): void {
    this.userService.updateUser(this.userId, form.value).subscribe(() => {
      this.snackBar.open('User updated successfully!', 'Close', {
        
        duration: 3000, // Duration in milliseconds
      });

      this.router.navigate(['/nav2/edit-user/'+this.userId]);
      
     
    });
  }

}
