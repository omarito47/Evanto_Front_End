import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-forget-pwd-step1',
  templateUrl: './forget-pwd-step1.component.html',
  styleUrls: ['./forget-pwd-step1.component.css']
})
export class ForgetPwdStep1Component {
  emailForm!: FormGroup;
  validCode!: boolean ;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router

  ) { }

  ngOnInit() {
    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]]
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
  
  
}
