import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Subject } from 'rxjs';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cartItemList : any =[]
  public productList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>("");
  itemDelete= new Subject<boolean>();
  allDelete= new Subject<boolean>();
  constructor(private http:HttpClient) { }

  getProducts(){
    return this.http.get('http://localhost:3000/cart').pipe(map((response)=>{
      const arr=[];
      for(let key in response){
        if(response.hasOwnProperty(key)){
          arr.push(response[key]);
        }
      }
      return arr;
    }))
  }

  setProduct(product : any){
    this.cartItemList.push(...product);
    this.productList.next(product);
  }

  addtoCart(newItemWithId : any){
    return this.http.post('http://localhost:3000/cart',newItemWithId);
  }

  getTotalPrice() : number{
    let grandTotal = 0;
    this.cartItemList.map((a:any)=>{
      grandTotal += a.total;
    })
    return grandTotal;
  }
  removeCartItem(product: any){
    this.cartItemList.map((a:any, index:any)=>{
      if(product.id=== a.id){
        this.cartItemList.splice(index,1);
      }
    })
    this.productList.next(this.cartItemList);
  }

  removeAllCart(id:any){
    return this.http.delete("http://localhost:3000/cart/"+id);
  }
  pay(user:any){
    return this.http.post("http://localhost:3000/pay/",user);
  }
  clearCart(id:any){
    
    return this.http.delete("http://localhost:3000/cart/"+id);
    
  }
}
