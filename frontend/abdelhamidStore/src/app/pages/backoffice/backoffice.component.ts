import { registerLocaleData } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductServiceService } from 'src/app/services/productService/product-service.service';



@Component({
  selector: 'app-backoffice',
  templateUrl: './backoffice.component.html',
  styleUrls: ['./backoffice.component.css']
})

export class BackofficeComponent implements OnInit {


  showSubs:boolean =false
  subsNumber = new Array()
  subproducts = new Array()
  newProuduct = new FormGroup({
    'name': new FormControl('',Validators.required),
    'descreption': new FormControl('',Validators.required),
    'price':new FormControl('',Validators.required),
    'img': new FormControl('',Validators.required),
    'categories' : new FormControl('',Validators.required),
  })
  slectedAttrib = new Array(new Array())
  imgsNumber = [0]
  attributes = new Array()
  categories=new Array()
  attribByType = new Array()
  img64=new Array()
  quantity = new FormGroup({
    'quantity':new FormControl('')
  })
  constructor(private service:ProductServiceService) { }
  
  ngOnInit(): void {
    this.service.getAttributes().subscribe((res)=>{
      this.attributes = res.attributes
      this.setAttribByType()
    })
    this.service.getCategories().subscribe((res)=>{
      this.categories = res.categories
    })
    document.getElementById('check')?.addEventListener('click',() => {
      let sub:any = document.getElementsByName('productType')
      for(let i=0 ; i<sub.length; i++)
      {
        if(sub[i].checked){
          if(this.showSubs != JSON.parse(sub[i].value)){
            this.slectedAttrib = new Array(new Array(),new Array())
            this.subsNumber = [0,1]
            this.subproducts = new Array(new FormGroup({
              'subProductName': new FormControl('',Validators.required),
              'subProductDescreption': new FormControl(''),
              'subProductQuantity':new FormControl('',Validators.required),
              'subProductImg': new FormControl('',Validators.required),
            }),new FormGroup({
              'subProductName': new FormControl('',Validators.required),
              'subProductDescreption': new FormControl(''),
              'subProductQuantity':new FormControl('',Validators.required),
              'subProductImg': new FormControl('',Validators.required),
            }))
          }
          this.showSubs = JSON.parse(sub[i].value)
        }
      }
    })
  }
  
  setAttribByType(){
    for(let attrib of this.attributes){
      for(let i=0;i<this.attributes.length;i++){
        if(this.attribByType.indexOf(attrib.type) > -1)continue
        else 
        {
          this.attribByType.push(attrib.type)
        }
      }
    }

  }
  incriseSubsNumber(){
    if(this.subsNumber.length<10)
    this.subsNumber.push(this.subsNumber.length)
    this.subproducts.push(new FormGroup({
      'subProductName': new FormControl('',Validators.required),
      'subProductDescreption': new FormControl(''),
      'subProductQuantity':new FormControl('',Validators.required),
      'subProductImg': new FormControl('',Validators.required),
    }))
    this.slectedAttrib.push(new Array())
  }
  decriseSubsNumber(){
    if(this.subsNumber.length>2)
    this.subsNumber.pop()
    this.subproducts.pop()
    this.slectedAttrib.pop()
  }

  incriseImgsNumber(){
    if(this.imgsNumber.length<10)
    this.imgsNumber.push(this.imgsNumber.length)

  }
  decriseImgsNumber(){
    if(this.imgsNumber.length>1)
    this.imgsNumber.pop()
  }
  addAttrib(attrib:any,id:any){
    this.slectedAttrib[id].push(attrib)

  }



  createProduct(){
    this.newProuduct.controls['img'].setValue(this.img64[0])
    if(this.newProuduct.valid)
    {
      this.service.createProduct(this.newProuduct.value).subscribe((res)=>{
        if(res.status){
          let i=0
          for(let img of this.img64)
          {
            let data = ({
              "img":img,
              "id":res.product.insertId,
              "name":this.newProuduct.controls.name.value,
              "imgId":i
            }) 
          this.service.addImg(data).subscribe((res)=>{
          })
          i++
           }
           if(this.showSubs == true)
           {
            let i= 0
            for(let sub of this.subproducts)
            {
              let data = ({
                "id":res.product.insertId,
                "img":sub.controls.subProductImg.value,
                "name":sub.controls.subProductName.value,
                "decreption":sub.controls.subProductDescreption.value,
                "quantity":sub.controls.subProductQuantity.value
              })
              this.service.createSubProduct(data).subscribe((result)=>{
                for(let att of this.slectedAttrib[i])
                {
                  let data=({
                    "id":result.subProduct.insertId,
                    "idAttrib":att.id_att
                  })
                  this.service.createAttrib(data).subscribe((res)=>{
                  })
                  
                }
                i++
              })
            }
          }
           else
           {
            let data = ({
              "id":res.product.insertId,
              "img":this.img64[0],
              "quantity":this.quantity.controls.quantity.value,
              "name":this.newProuduct.controls.name.value,
              "descreption":' '
            })
            this.service.createSubProduct(data).subscribe((result)=>{
              for(let att of this.slectedAttrib[0])
              {
                let data=({
                  "id":result.subProduct.insertId,
                  "idAttrib":att.id_att
                })
                this.service.createAttrib(data).subscribe((res)=>{
                })
              }
            }
            )
           }
        }
      })
    }

  }
  
  changeListener($event:any,id:number): void {
    this.readThis($event.target,id);
}

readThis(inputValue: any,id:number): void {
let image:any
var file: File = inputValue.files[0];
var myReader: FileReader = new FileReader();
myReader.readAsDataURL(file)
myReader.onloadend = (e) => {
  this.img64[id] = myReader.result as string;
}
}
changeImg($event:any,id:number): void {
  this.readThat($event.target,id);
}

readThat(inputValue: any,id:number): void {
let image:any
var file: File = inputValue.files[0];
var myReader: FileReader = new FileReader();
myReader.readAsDataURL(file)
myReader.onloadend = (e) => {

  this.subproducts[id].controls['subProductImg'].setValue(myReader.result as string)
}
}

}
