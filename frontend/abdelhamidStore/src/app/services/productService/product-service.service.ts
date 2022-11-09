import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { __core_private_testing_placeholder__ } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  constructor(private _http:HttpClient) { }
  //change here
  dbProductUrl = 'http://192.168.1.2:3000/product'

  getProducts():Observable<any>
  {
    return this._http.get(`${this.dbProductUrl}/products`)
  }
  getProduct(pId:any):Observable<any>
  {
    return this._http.get(`${this.dbProductUrl}/products/${pId}`)
  }
  getCategories():Observable<any>
  {
    return this._http.get(`${this.dbProductUrl}/getCategories`)  
  }
  getSlider():Observable<any>
  {
    return this._http.get(`${this.dbProductUrl}/getSlider`)  
  }
  createProduct(data:any):Observable<any>
  {
    return this._http.post(`${this.dbProductUrl}/createProduct`,data)
  }
  addImg(data:any):Observable<any>
  {
    return this._http.post(`${this.dbProductUrl}/addImg`,data)
  }
  getAttributes():Observable<any>
  {
    return this._http.get(`${this.dbProductUrl}/getAttributes`)
  }
  createSubProduct(data:any):Observable<any>
  {
    return this._http.post(`${this.dbProductUrl}/ceateSubProduct`,data)
  }
  createAttrib(data:any):Observable<any>
  {
    return this._http.post(`${this.dbProductUrl}/createAttrib`,data)
  }
  getProductByAttrib(id:any):Observable<any>
  {
    return this._http.get(`${this.dbProductUrl}/getProductByAttrib/${id}`)
  }
}
