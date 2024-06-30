import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User, UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-forget-pwd-step1',
  templateUrl: './forget-pwd-step1.component.html',
  styleUrls: ['./forget-pwd-step1.component.css']
})
export class ForgetPwdStep1Component {
  emailForm!: FormGroup;
  validCode!: boolean ;
  user:User;
  formSubmitted = false;
  showErrorMessage = false; // New variable to control error message display

 
  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private userService: UsersService,

  ) { }

  ngOnInit() {
    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }


  async sendVerificationCode() {
    const url = 'http://127.0.0.1:9090/user/send-verification-code';
    const email= this.emailForm.get('email')!.value;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email})
    };
  
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  getUserByEmail() {
    this.userService.getUserByEmail(this.emailForm.get('email')!.value).subscribe(
      user => {
        this.user = user;
        console.log("==>" + this.user);
        this.sendVerificationCode();
  
        this.router.navigate(['/auth/verificationCode', this.user._id]);
        localStorage.setItem('fromforgetPassword', "true");
      },
      error => {
        console.error(error);
        this.showErrorMessage = true; // Set showErrorMessage to true in case of an error
      }
    );
  }
  
  
}
