import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {
  products = [];
  categories = [ //For products categories
    "All Products",
    "Computers",
    "Phones",
    "Cameras"
  ];
  filterProducts: any;
  activeCategory:String = this.categories[0];
  loginUser;  cartItemList : any =[]
  constructor(private router: Router, 
    private productservice: ProductService,
    private cartService: CartService,
    private user:UserService) { }

  ngOnInit(): void {
    this.productservice.getData().subscribe((data)=>{
    this.products = data;
    this.filterProducts = this.products; // All products 
    console.log(this.products);
    });
    this.loginUser=JSON.parse(localStorage.getItem('user'));
  }

  onChange(){
    this.router.navigate(['/productdetail']);
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

  onSelectCategory(category:String){
    if (category == "All Products") {
      this.filterProducts = this.products;
      this.activeCategory = category;
    } else {
      this.filterProducts = this.products.filter(product => category == product.category);
      this.activeCategory = category;
    }
  }
}

