import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { ProductServiceService } from 'src/app/services/productService/product-service.service';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  someSubscription: any;
  constructor(private service:ProductServiceService,private routre:Router,private sanitizer:DomSanitizer) {
    this.routre.routeReuseStrategy.shouldReuseRoute = function () {
    return false;
  };
  this.someSubscription = this.routre.events.subscribe((event) => {
    if (event instanceof NavigationEnd) {
      // Here is the dashing line comes in the picture.
      // You need to tell the router that, you didn't visit or load the page previously, so mark the navigated flag to false as below.
      this.routre.navigated = false;
    }
  });}

  ngOnDestroy() {
    if (this.someSubscription) {
      this.someSubscription.unsubscribe();
    }
  }
  products:any
  ngOnInit(): void {
    let url = (window.location).href;
    let id = url.substring(url.lastIndexOf('/') + 1);
    this.service.getProductByAttrib(id).subscribe(res=>{
      this.products = res.products
      console.log(this.products)
    })
  }
  toProduct(prodId:number){
    this.routre.navigate(['/product',prodId])
  }
  sanitize(img:any){
    return this.sanitizer.bypassSecurityTrustUrl(img);
    
  }
  

}
