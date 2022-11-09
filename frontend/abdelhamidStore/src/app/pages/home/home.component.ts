import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from 'src/app/services/productService/product-service.service';
import {DomSanitizer} from '@angular/platform-browser';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products:any

  constructor(private _service:ProductServiceService,private sanitizer:DomSanitizer,private routre:Router) {}
  ngOnInit(): void {
    this.getProduct()
  }
  getProduct()
  {
    this._service.getProducts().subscribe((res)=>{
      this.products = res.data
    })
  }
  sanitize(img:any){
    return this.sanitizer.bypassSecurityTrustUrl(img);
    
  }
  toProduct(prodId:number){
  this.routre.navigate(['/product',prodId])
}


}
