import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User, UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-forget-pwd-step2',
  templateUrl: './forget-pwd-step2.component.html',
  styleUrls: ['./forget-pwd-step2.component.scss']
})
export class ForgetPwdStep2Component implements OnInit {
  userId: string;
  passwordForm: FormGroup;
  user: User;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UsersService
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.passwordForm = this.formBuilder.group(
      {
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]]
      },
      { validator: this.passwordMatchValidator }
    );
  }

  updateUserPassword(): void {
    if (this.passwordForm.valid) {
      this.userService.getUserById(this.userId).subscribe(user => {
        this.user = user;
        this.user.password = this.passwordForm.value.password;
        this.userService.updateUser(this.userId, this.user).subscribe(() => {
          this.router.navigate(['/auth/login']);
        });
      });
    } else {
      this.passwordForm.markAllAsTouched();
    }
  }

  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { passwordMismatch: true };
    }

    return null;
  }
}