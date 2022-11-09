import {  Component, DoBootstrap, OnInit } from '@angular/core';
import { ProductServiceService } from 'src/app/services/productService/product-service.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
  slider = new Array()
  firstSlid:any
  otherSlid = new Array()
  
  constructor(private _service:ProductServiceService,private sanitizer:DomSanitizer) { }

  ngOnInit(): void {
    this.getSlider()
  }

  getSlider(){
    this._service.getSlider().subscribe((res)=>{
      this.slider = res.data
      this.setValues()
    })
  }
  sanitize(img:any){

    return this.sanitizer.bypassSecurityTrustUrl(img);
    
  }
  setValues(){
    this.firstSlid = this.slider[0]
    for(let i=1; i<this.slider.length; i++){
      let slid = new Array()
      slid.push(this.slider[i],{num:i})
      console.log(slid)

      this.otherSlid.push(slid)
    }
    console.log(this.slider,"slider\n",this.firstSlid,'firstSlid\n',this.otherSlid,'otherSlid')
  }
}
