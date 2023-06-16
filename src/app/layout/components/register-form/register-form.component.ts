import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../login-form/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder,private httpSv:AuthService,private router:Router) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      mob: ['', Validators.required]

    });
  }
  texttoshow=''
  status=''

  send() {
    this.texttoshow=''
    this.status=''
   
    if (!this.registerForm.value.name) {
      this.texttoshow='Name Cannot be Empty'
     this.status='warning'
      return false;
    } 
    else if (!this.registerForm.value.email) {
      this.texttoshow='Email Cannot be Empty'
      this.status='warning'
      return false;
    } 
    else if (!this.registerForm.value.password) {
      this.texttoshow='Password Cannot be Empty'
      this.status='warning'
      return false;
    } 
    
    
    else if (!this.registerForm.value.mob) {
      this.texttoshow='Mobile Cannot be Empty'
      this.status='warning'
      return false;
    } 

    let body = {
      name:this.registerForm.value.name ,
      email:this.registerForm.value.email ,
      password:this.registerForm.value.password ,
      mob:this.registerForm.value.mob 
    };


 this.httpSv.register(body).subscribe(
  (data:any) => {

    if(data.token != null){
 
      localStorage.setItem('cust_id',data.cust_id)
      localStorage.setItem('user_type','customer')
      localStorage.setItem('token', data.token);
      this.router.navigate(['/admin/reservation']);
  
      this.registerForm = this.fb.group({
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
