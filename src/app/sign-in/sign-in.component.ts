import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  signinForm!: FormGroup;
  formSubmitted = false;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
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
          (response) => {
            console.log(response);
            // Handle the response here
            // For example, redirect to a new page
            this.router.navigate(['/homePage']);
          },
          (error) => {
            console.error(error);
            // Handle the error here
          }
        );
    }
  }
}