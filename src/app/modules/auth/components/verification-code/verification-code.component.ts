import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UsersService,User } from 'src/app/core/services/users.service';



@Component({
  selector: 'app-verification-code',
  templateUrl: './verification-code.component.html',
  styleUrls: ['./verification-code.component.css']
})
export class VerificationCodeComponent {
  codeForm!: FormGroup;
  validCode!: boolean ;
  user!:User;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private userService: UsersService,

  ) { }

  ngOnInit() {
    this.codeForm = this.formBuilder.group({
      code: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]]
    });
  }


  verify() {
    const id = this.route.snapshot.paramMap.get('id');
    const code = this.codeForm.get('code')!.value;
    this.validCode=false;

    const url = `http://127.0.0.1:9090/user/verify/${id}/${code}`;
    this.http.get(url).subscribe(
      response => {
        this.validCode=true;
        console.log(response);
        console.log("this is api code: " + code)
        
        // Navigate to the sign-in page if response is 200
        
        if(localStorage.getItem('fromforgetPassword')=="true"){
         
          this.router.navigate(['/auth/forgetpwd_step2',id]);


        }else{
          this.router.navigate(['/auth/login']);

        }
        
      },
      error => {
        
        console.error(error);
      }
    );
  }
}
