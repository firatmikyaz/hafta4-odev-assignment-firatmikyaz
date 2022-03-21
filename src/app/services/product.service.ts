import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getData(){
    return this.http.get('http://localhost:3000/products').pipe(map((response)=>
    {
      const arr = [];
      for (let key in response) {
        arr.push(response[key]);
      }
      return arr;
      // console.log(response);
    }))
  }

  getDetail(id){
    return this.http.get('http://localhost:3000/products').pipe(map((response)=>{
      return response;
    }))
  }
}
