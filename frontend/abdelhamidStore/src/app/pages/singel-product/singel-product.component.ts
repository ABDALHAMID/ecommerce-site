import { Attribute, Component, OnInit } from '@angular/core';
import { ProductServiceService } from 'src/app/services/productService/product-service.service';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-singel-product',
  templateUrl: './singel-product.component.html',
  styleUrls: ['./singel-product.component.css']
})
export class SingelProductComponent implements OnInit {


  constructor(private service: ProductServiceService, private sanitizer: DomSanitizer) {


  }

 product:any
  subProduct: any
  subProductsList = new Array()
  activeSubProd:any
  colors = new Array()
  activeImg = ''
  imgs: any
  activeAttributes = new Array()
  attrib = new Array()
  quantity: number = 0
  quantityInput = new FormControl('')
  
  ngOnInit(): void {
    this.getProduct()

  }
  getProduct() {
    let url = (window.location).href;
    let id = url.substring(url.lastIndexOf('/') + 1);
    this.service.getProduct(id).subscribe((res) => {
      this.product = res.product[0]
      this.subProduct = res.subProduct
      this.imgs = res.imgs
      this.setVar()
    })
  }

  setVar() {
    let a = new Array()
    //select unique products
    for (let i = 0; i < this.subProduct.length; i++) {
      let b: boolean = false;
      for (let j = 0; j < a.length; j++) {
        if (this.subProduct[i].id_sub_prod === a[j]) {

          b = true
          break
        }
      }
      if (b === false) {
        a.push(this.subProduct[i].id_sub_prod)
        this.subProductsList.push(this.subProduct[i])
      }
      //giv an img to sub product without img
      if (this.subProduct[i].sub_prod_img == '' || this.subProduct[i].sub_prod_img == null) {
        this.subProduct[i].sub_prod_img = this.product?.img
      }
    }
    this.activeSubProd = this.subProductsList[0]
    this.activeImg = this.activeSubProd.sub_prod_img
    this.getAttrib(this.activeSubProd.id_sub_prod)
    
  }

 


  getAttrib(id: Number) {
    this.activeAttributes = new Array()

    for (let i = 0; i < this.subProduct.length; i++) {
      if (id === this.subProduct[i].id_sub_prod) {
        this.activeAttributes.push({ 'type': this.subProduct[i].type, 'name': this.subProduct[i].name, 'value': this.subProduct[i].value })
      }

    }
    this.getColors();
  }

  getColors(){
    this.colors = new Array()
    for(let col of this.activeAttributes){
      if(col.type == 'color')this.colors.push(col.value)
    }
    this.setAttrib();
  }

  sanitize(sub_prod_img: any) {
    return this.sanitizer.bypassSecurityTrustUrl(sub_prod_img);
  }
  convertProd(id: number) {
    
    for (let i = 0; i < this.subProductsList.length; i++) {
      if (id === this.subProductsList[i].id_sub_prod) {

        this.activeSubProd = this.subProductsList[i]
        this.getAttrib(this.activeSubProd.id_sub_prod)
        this.activeImg = this.activeSubProd.sub_prod_img


      }

    }
  }
  changeImg(img: any) {
    this.activeImg = img.img;
  }

  imageZoom(imgID: any, resultID: any) {

    var img: any, lens: any, result: any, cx: any, cy: any;
    img = document.getElementById(imgID);
    result = document.getElementById(resultID);
    /* Create lens: */
    lens = document.getElementById('lens') || document.createElement("DIV");
    lens.setAttribute("id", "lens")
    lens.setAttribute("class", "img-zoom-lens");
    /* Insert lens: */
    img.parentElement.insertBefore(lens, img);
    /* Calculate the ratio between result DIV and lens: */
    cx = result.offsetWidth / lens.offsetWidth;
    cy = result.offsetHeight / lens.offsetHeight;
    /* Set background properties for the result DIV */
    result.style.backgroundSize = (img.width * cx) + "px " + (img.height * cy) + "px";
    /* Execute a function when someone moves the cursor over the image, or the lens: */
    lens.addEventListener("mousemove", moveLens);
    img.addEventListener("mousemove", moveLens);
    /* And also for touch screens: */
    lens.addEventListener("touchmove", moveLens);
    img.addEventListener("touchmove", moveLens);
    function moveLens(e: any) {
      var pos, x, y;
      /* Prevent any other actions that may occur when moving over the image */
      e.preventDefault();
      /* Get the cursor's x and y positions: */
      pos = getCursorPos(e);
      /* Calculate the position of the lens: */
      x = pos.x - (lens.offsetWidth / 2);
      y = pos.y - (lens.offsetHeight / 2);
      /* Prevent the lens from being positioned outside the image: */
      if (x > img.width - lens.offsetWidth) { x = img.width - lens.offsetWidth; }
      if (x < 0) { x = 0; }
      if (y > img.height - lens.offsetHeight) { y = img.height - lens.offsetHeight; }
      if (y < 0) { y = 0; }
      /* Set the position of the lens: */
      lens.style.left = x + "px";
      lens.style.top = y + "px";
      /* Display what the lens "sees": */
      result.style.backgroundImage = "url('" + img.src + "')";
      result.style.backgroundPosition = "-" + (x * cx) + "px -" + (y * cy) + "px";
    }
    function getCursorPos(e: any) {
      var a, x = 0, y = 0;
      e = e || window.event;
      /* Get the x and y positions of the image: */
      a = img.getBoundingClientRect();
      /* Calculate the cursor's x and y coordinates, relative to the image: */
      x = e.pageX - a.left;
      y = e.pageY - a.top;
      /* Consider any page scrolling: */
      x = x - window.pageXOffset;
      y = y - window.pageYOffset;
      return { x: x, y: y };
    }
  }

  setAttrib()
  {
    this.attrib = new Array()
    for(let att of this.activeAttributes){
      if(att.type != 'color')this.attrib.push(att)
    }
  }

  setQuantity() {
    this.quantity = parseInt(this.quantityInput.value || '0')
  }


}
