import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from 'src/app/services/productService/product-service.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {

  categoryName:any
  categoryId:any
  productName:any

  constructor(private service:ProductServiceService) { }
  id:any
  ngOnInit(): void {
    let baseUrl = (window.location).href
    this.id = baseUrl.substring(baseUrl.lastIndexOf('/')+1)
    this.getInfo()
  }
  getInfo(){
    this.service.getProduct(this.id).subscribe((res)=>{
      this.productName = res.product[0].name
      this.categoryName = res.categorie[0].name
      this.categoryId = res.product[0].id_category
    })
  }


}
