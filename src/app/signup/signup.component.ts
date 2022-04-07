import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { KedoApiService } from '../service/kedo-api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm!:FormGroup;
  constructor(private formBuilder:FormBuilder, private _credentailAPI:KedoApiService, private router:Router) { }

  ngOnInit(): void {
    this.signupForm=this.formBuilder.group({
      name:[""],
      email:[""],
      mobile:[""],
      password:[""]
    })
  }

  signup(){
    this._credentailAPI.signUp(this.signupForm.value).subscribe(res=>{
      alert("signup success");
      this.signupForm.reset();
      this.router.navigate(['/login'])
    }, err=>{
      alert("something wrong")
    })
  }
}
