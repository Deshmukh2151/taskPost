import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class KedoApiService {
  public url="http://localhost:3000/posts";
  public credentailURL="http://localhost:3000/signUp";
  constructor(private _http:HttpClient) { }

  login(){
    return this._http.get<any>(this.credentailURL)
  }

  signUp(signUpData:any){
    return this._http.post<any>(this.credentailURL,signUpData)
  }
  addPosts(data:any){
    return this._http.post<any>(this.url,data).pipe(map((res:any)=>{
      return res
    }))
  }

  getPosts(){
    return this._http.get<any>(this.url).pipe(map((res:any)=>{
      return res
    }))
  }

  updatePosts(data:any, id:number){
    return this._http.put<any>("http://localhost:3000/posts/"+id,data).pipe(map((res:any)=>{
      return res
    }))
  }

  deletePost(id:number){
    return this._http.delete<any>("http://localhost:3000/posts/"+id).pipe(map((res:any)=>{
      return res
    }))
  }

}
