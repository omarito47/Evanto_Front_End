import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User, UsersService } from 'src/app/core/services/users.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  userBody={
    name: '',
    email: '',
    age: 0,
    address: '',
    phoneNumber: ''
  };
  isEditMode: boolean = false;
  isFromUserlistPage: string;
  userId: string;

  constructor(
    private userService: UsersService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this. userId = this.route.snapshot.paramMap.get('id');
    this.isFromUserlistPage = localStorage.getItem('fromListUser');

    if (this.userId) {
      this.isEditMode = true;
      this.userService.getUserById(this.userId).subscribe(user => {
        this.userBody.address = user.address;
        this.userBody.age = user.age;
        this.userBody.email = user.email;
        this.userBody.name = user.name;
        this.userBody.phoneNumber = user.phoneNumber;

      });
    }
  }

  updateUser(): void {
    const url = 'http://127.0.0.1:9090/user/66772b5a9b66fcaa30c2f3ea';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    this.http.put(url, this.userBody, { headers }).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.error(error);
      }
    );
  }

  onSubmit(form: NgForm): void {
    if (this.isEditMode) {
      this.userService.updateUser(this.userId, form.value).subscribe(() => {});

      this.snackBar.open('User updated successfully!', 'Close', {
        duration: 3000, // Duration in milliseconds
        panelClass: ['custom-snackbar']
      });

      if (this.isFromUserlistPage === 'true') {
        this.router.navigate(['/dashboard']);
        localStorage.setItem('fromListUser', 'false');
      } else {
        this.router.navigate(['/users/edit/' + this.userId]);
      }
    } else {
      this.userService.createUser(form.value).subscribe(() => {
        this.router.navigate(['/dashboard']);
      });
    }
  }
}