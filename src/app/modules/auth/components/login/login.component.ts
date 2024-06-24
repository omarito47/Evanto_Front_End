import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  signinForm!: FormGroup;
  formSubmitted = false;
  showErrorMessage = false; // New variable to control error message display

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  navigateToForgotPassword() {
    this.router.navigate(['/forgot-password']);
  }
  editUser(id:any){
    const url = "users/edit/"+id
    this.router.navigateByUrl(url)
  }

  submitForm() {
    this.formSubmitted = true;

    if (this.signinForm.valid) {
      const formData = {
        email: this.signinForm.value.email,
        password: this.signinForm.value.password
      };

      this.http.post('http://127.0.0.1:9090/user/signin', formData, { headers: { 'Content-Type': 'application/json' } })
        .subscribe(
          (response: any) => {
            console.log(response);
            // Store user ID and token in local storage
            localStorage.setItem('userId', response.userId);
            localStorage.setItem('token', response.token);
            localStorage.setItem('role', response.role);
            localStorage.setItem('fromListUser', "false");

            if(response.role==='admin'){
              this.router.navigate(['/dashboard']);


            }else{
              //this.editUser(response.userId)
              this.router.navigate(['/nav2/edit-user/' + response.userId]);
            }

            // Redirect to the home page
          },
          (error) => {
            console.error(error.error);
            this.showErrorMessage = true; // Display the error message
            // Handle the error here
          }
        );
    }
  }
}