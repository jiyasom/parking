import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/interfaces/app-state';

import { Router } from '@angular/router';
import { AuthService } from './auth.service';
@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, public store: Store<IAppState>,
    public httpSv: AuthService ,private router :Router) { }

  ngOnInit() {


    let user_type=localStorage.getItem('user_type')

    if(user_type=='admin'){


      this.router.navigate(['/vertical/slote_settings']);
      this.httpSv.isAuthenticated_success();
    }else if(user_type=='customer'){
      this.router.navigate(['/vertical/reservation']);
      this.httpSv.isAuthenticated_success();
    }

    this.texttoshow=''
    this.status=''
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
texttoshow=''
status=''
  send() {

    localStorage.removeItem('token');
    this.texttoshow=''
    this.status=''
   
    if (!this.loginForm.value.email) {
      this.texttoshow='Email Cannot be Empty'
     this.status='warning'
      return false;
    } else if (!this.loginForm.value.password) {
      this.texttoshow='Password Cannot be Empty'
      this.status='warning'
      return false;
    } else if (this.loginForm.value.email=='admin@123.com'&&this.loginForm.value.password=='admin') {
      
    localStorage.setItem('user_type','admin')
      this.router.navigate(['/vertical/slote_settings']);

     this.httpSv.isAuthenticated_success();


      return false;
    } 

    let body = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };


 this.httpSv.login(body).subscribe(
  (data:any) => {

    if(data){


localStorage.setItem('cust_id',data.user.cust_id)
      localStorage.setItem('user_type','customer')
      localStorage.setItem('token', data.token);
      this.router.navigate(['/admin/reservation']);
  
      this.loginForm = this.fb.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
      });

    }
  },
  err => {
    console.log(err);
    this.status='error'
    this.texttoshow='Invailid user login'
  },
  () => {
   
  }
);

  }





}
