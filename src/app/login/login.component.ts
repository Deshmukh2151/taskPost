import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, Output ,EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
// import { EventEmitter } from 'stream';
import { KedoApiService } from '../service/kedo-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!:FormGroup;
  constructor(private formBuilder:FormBuilder, private _credentailAPI:KedoApiService, private router:Router) { }

  loginUser:any;
  @Output() newItemEvent = new EventEmitter();

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
        this.loginUser=user.name;
        this.newItemEvent.emit(this.loginUser)
        this.router.navigate(['/dashboard'])
        console.log("username",this.loginUser);
        
      }else{
        alert("Please Enter Valid Credentails")
      }
    }, err=>{
      alert("Server Site Error")
    })
  }
 
  testuser(){
    this.newItemEvent.emit(this.loginUser);
  }
}
