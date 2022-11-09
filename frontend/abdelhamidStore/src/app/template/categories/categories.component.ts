import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from 'express';
import { ProductServiceService } from 'src/app/services/productService/product-service.service';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  constructor(private service:ProductServiceService) { }
  
  categories:any
  mainCategories=new Array()
  ngOnInit(): void {
    this.getCategories()

  }

  getCategories(){
    this.service.getCategories().subscribe((res)=>{
      this.categories = res.categories
      this.setValue()
    })
    
  }
  setValue(){
    for(let i=0; i<this.categories.length || 0 ; i++)
    {
      if(this.categories[i].parent_id == 0)
      {
        this.mainCategories.push(this.categories[i])
      }
    }
  }
  getcat(){
    for(let cat of this.categories.parent)
    if(cat.parent_id == 0)
    {
      this.mainCategories.push(cat)
      
    }

  }
}
