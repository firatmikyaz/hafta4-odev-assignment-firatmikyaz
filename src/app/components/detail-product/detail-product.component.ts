import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css']
})
export class DetailProductComponent implements OnInit {
  productId;
  data;
  loginUser;
  constructor(private route: ActivatedRoute, private productService: ProductService, private cartService: CartService) { }

  ngOnInit(): void {
    // this.loginUser = JSON.parse(localStorage.getItem('user')).id;
    this.route.params.subscribe((params:Params)=>{
      this.productId = params['id'];
    })
    this.productService.getData().subscribe(alldata => {
      alldata.forEach(element => {
        if (element.id == this.productId) {
          this.data = element;
          console.log(this.data);
        }
      })
    })
  }

  addtocart(item:any){
   
    const newCartWithUser={
      // email:this.loginUser,
      // firstName:this.loginUser.name,
      userId:this.loginUser.id,
      // lastName:this.loginUser.lastName,
      // password:this.loginUser.password
      // {
      //   "img": "../../../assets/images/1.jfif",
      //   "productName": "Apple1",
      //   "description": "Color White",
      //   "price": "20000",
      //   "id":1
      // },
      img:item.img,
      productName:item.productName,
      description:item.description,
      price:item.price,
      productId:item.id
    }
    this.cartService.addtoCart(newCartWithUser).subscribe((data:any)=>{
      console.log(data);
   });
  }
}
