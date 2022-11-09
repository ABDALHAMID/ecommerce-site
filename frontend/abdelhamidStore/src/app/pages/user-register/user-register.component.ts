import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/userService/user-service.service';
import { waitForAsync } from '@angular/core/testing';
@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  logInError: any;
  userMsg: any;
  signUpError: any;
  signUpSuc:any
  logInSuc:any
  hisloged:any;
  user:any
  
  constructor(private service: UserServiceService, private _location: Location, private router:Router) { }
  
  
  logInForm = new FormGroup({
    'email': new FormControl('', Validators.required),
    'password': new FormControl('', Validators.required)
  })

  ngOnInit(): void {
    this.service.getUserLog().subscribe((res)=>{
      if(res.status==true)
      {
        this.user = res.user
        return this.hisloged = true
      }
      else{
        return this.hisloged =false
      }
    }) 
  }
  
  
  logIn() {
    if(this.logInForm.valid)
      {
        this.service.logIn(this.logInForm.value).subscribe((res:any)=>{
          //if user exist
          if(res.userEx == true){
            this.logInError=false;
            //if password corect
            if(res.status == true){
              this.logInError=false;
              localStorage.clear();
              localStorage.setItem('token',res.token)
              this.router.navigate(['/home'])
            }
            else
            {
              this.logInError=true;
              this.userMsg='password incorect try again'
              this.logInForm.controls.password.reset();
              
            }
          }
          else{
            this.logInError=true;
            this.userMsg='email not found try another one'
          }
        })
      }
    else{
      this.logInError = true;
      this.userMsg = 'all filde are require'
    }


  }

  signUpForm = new FormGroup({
    'firstName':new FormControl('',Validators.required),
    'lastName':new FormControl('',Validators.required),
    'email': new FormControl('', Validators.required),
    'password': new FormControl('', Validators.required),
    'phone':new FormControl(''),
    'birthday':new FormControl('',Validators.required)
  })

  signUp(){
    if(this.signUpForm.valid)
    {
      this.service.signUp(this.signUpForm.value).subscribe((res:any)=>{
        if(res.status == true){
          this.signUpError = false;
          this.signUpForm.reset();
          this.signUpSuc = true;
          this.userMsg = "singUP was successfull, you can logIn now"
        }
        else
        {
          this.signUpError = true;
          this.userMsg = 'email exist please changet'
        }
          
      })
    }
    else
    {
      this.signUpError = true;
      this.userMsg = 'please set all require filds'
    }
    
  }
  closeAllert(){
    this.logInError = false;
    this.signUpError = false;
    this.signUpSuc = false;
    this.logInSuc = false;
  }
}

