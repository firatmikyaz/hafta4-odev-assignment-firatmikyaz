import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  products : any = [];
  grandTotal !: number;
  user:any=JSON.parse(localStorage.getItem('user'));
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.getProducts();
    this.cartService.itemDelete.subscribe(bol=>{
      this.products=[];
      this.getProducts();
    })
    this.cartService.allDelete.subscribe((res)=>{
       this.products = [];   
    });
  }
  getProducts(){
    this.cartService.getProducts().subscribe((res:any)=>{
      res.forEach((product) => {
        if(JSON.parse(localStorage.getItem('user')).id==product.userId){
          this.products.push(product);
        }
      });
    });
  }
  onDelete(itemId){
    this.cartService.removeAllCart(itemId).subscribe(()=>{
      this.cartService.itemDelete.next(true);
    });
  }
  onPay(){
    this.cartService.pay(this.user).subscribe((res)=>{
   
    console.log(res);
   
    });
    const ids=[];
    this.products.forEach(product => {
      ids.push(product.id);
    });
    ids.forEach((id:any) => {
      this.cartService.clearCart(id).subscribe((res)=>{
        this.cartService.allDelete.next(true);
      });
    });
  }

}
