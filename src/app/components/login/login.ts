import { Component, inject, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormField, MatInput } from "@angular/material/input";
import { MatAnchor, MatButton } from "@angular/material/button";
import { Auth } from '../../services/auth/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [MatCardModule, ReactiveFormsModule, MatFormField, MatInput, MatAnchor, MatButton],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private fb = inject(FormBuilder);
  private authservice = inject(Auth);
  private router = inject(Router);
  readonly createdAccount = output();

  protected createAccount = signal(false);

  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(5)]]
  });

  createAccountForm = this.fb.nonNullable.group({
    fullName:['',Validators.required],
    email:['',[Validators.required, Validators.email]],
    password:['',[Validators.required, Validators.minLength(5)]]
  })

  login(){
    if(this.loginForm.invalid){
      console.log('invalide details')
      return;
    }
    const { email, password } = this.loginForm.getRawValue();
    const success = this.authservice.login(email, password);
    if(success){
      const role = this.authservice.getRole();

      if(role === 'admin'){
        this.router.navigate(['/admin']);
      }else{
        this.router.navigate(['/user']);
      }
    }else{
      console.log('Invalid email or Password');
    }
  }

  signUp(){
    if(this.createAccountForm.valid){
      this.authservice.addUser(this.createAccountForm.getRawValue());
      this.createAccountForm.reset();
      this.createAccount.set(false);
    }
  }

}

