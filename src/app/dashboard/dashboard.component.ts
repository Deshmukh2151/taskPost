import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Post } from '../modal/post';
import { KedoApiService } from '../service/kedo-api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnChanges {
  formValue!:FormGroup;
  allPostData:Post[]=[];
  postModelObj:Post= new Post;
  showadd!:boolean;
  showUpdate!:boolean;
  // @Input() username: any;
  test:any;
  constructor(private formBuilder:FormBuilder, private _api:KedoApiService) { 
    
  }

  ngOnInit(): void {

    this.formValue=this.formBuilder.group({
      name:[""],
      posts:[""],
    })
    this.getAllData();
    // this.username(Event);
  }
  ngOnChanges(changes: SimpleChanges): void {
    // console.log("dashboard user",this.username)
    this.username(event);
  }
   clickAddPost(){
     this.formValue.reset();
     this.showadd=true;
     this.showUpdate=false;
   }
   addPost(){
    this.postModelObj.name=this.formValue.value.name;
    this.postModelObj.posts=this.formValue.value.posts;

    this._api.addPosts(this.postModelObj).subscribe(res=>{
      console.log(res);
      alert("Added Successfully");

      //Clear fill form data 0
      let ref=document.getElementById('clear');
      ref?.click();

      this.formValue.reset();
      this.getAllData()
    },
    err=>{
      alert("something wrong")
    })
  }

  getAllData(){
    this._api.getPosts().subscribe(res=>{
      this.allPostData=res;
    })
  }

  deleteData(data:any){
   this._api.deletePost(data.id).subscribe(res=>{
     alert("delete");
     this.getAllData()
   })
  }
  // username(event:any){
  //   this.test=event
  //   console.log("Dashboard", this.);
  // }
  username(event:any){
     console.log("testsss",event.target.value);  
  }
  oneditData(data:any){
    this.showadd=false;
    this.showUpdate=true;
    this.postModelObj.id=data.id;
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['posts'].setValue(data.posts);
  }

  updatePost(){
    this.postModelObj.name=this.formValue.value.name;
    this.postModelObj.posts=this.formValue.value.posts;

    this._api.updatePosts(this.postModelObj, this.postModelObj.id)
    .subscribe(res=>{
      alert("update");
      this.formValue.reset();
      this.getAllData()
    })
  }

}
