import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { KedoApiService } from '../service/kedo-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!:FormGroup;
  constructor(private formBuilder:FormBuilder, private _credentailAPI:KedoApiService, private router:Router) { }

  ngOnInit(): void {
    this.loginForm=this.formBuilder.group({
      email:[''],
      password:['']
    })
  }

  login(){
    this._credentailAPI.login().subscribe(res=>{
      const user=res.find((a:any)=>{
        return a.email===this.loginForm.value.email && a.password===this.loginForm.value.password
      })
      if(user){
        alert("User Login Successfully")
        this.loginForm.reset();
        this.router.navigate(['/dashboard'])
      }else{
        alert("Please Enter Valid Credentails")
      }
    }, err=>{
      alert("Server Site Error")
    })
  }
 
}
