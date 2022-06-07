import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalVariable } from 'src/app/models/global'
import { ListResponseModel } from '../models/listResponseModel';
import { ObjectResponseModel } from '../models/objectResponseModel';
import { Product } from '../models/product';
import { ProductImages } from '../models/productImages';
import { ResponseModel } from '../models/responseModel';
import {Order} from "../models/order";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiUrl = GlobalVariable.BASE_URL

  constructor(private httpClient:HttpClient) { }

  getProduct():Observable<ListResponseModel<Product>>{
    let path = this.apiUrl + "api/products/getallproductdetail";
    return this.httpClient.get<ListResponseModel<Product>>(path);
  }
  getProductByCategory(categoryId:number,languageId:number):Observable<ListResponseModel<Product>>{
    let path = this.apiUrl + `api/products/getproductbycategory?categoryId=${categoryId}&languageId=${languageId}`;
    return this.httpClient.get<ListResponseModel<Product>>(path);
  }
  getProductByLanguage(langId:number):Observable<ListResponseModel<Product>>{
    let path = this.apiUrl + "api/products/getproductbyLanguage?LanguageId=" + langId;
    return this.httpClient.get<ListResponseModel<Product>>(path);
  }
  getProductDetailByProduct(productId:number):Observable<ObjectResponseModel<Product>>{
    let Path = this.apiUrl + "api/products/getproductdetail?productId=" + productId
    return this.httpClient.get<ObjectResponseModel<Product>>(Path)
  }
  getImagesByProduct(productId: number): Observable<ListResponseModel<ProductImages>> {
    let Path = this.apiUrl + 'api/productimages/getbyproductid?productId=' + productId;
    return this.httpClient.get<ListResponseModel<ProductImages>>(Path);
  }
  productAdd(product: Product):Observable<ObjectResponseModel<Product>>{
    return this.httpClient.post<ObjectResponseModel<Product>>(this.apiUrl + "api/products/add" ,product)
  }
  productUpdate(product: Product):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "api/products/update" ,product)
  }
  productDelete(product: Product):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "api/products/delete" ,product)
  }
  orderAdd(order:Order):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "api/orders/add" , order)
  }
  uploadImage(image:File ,productId:number):Observable<any>{
    const formData: FormData = new FormData();

    formData.append("ProductId",productId.toString())
    formData.append("Image",image)

    let path = this.apiUrl + "api/productImages/add";
    return this.httpClient.post<ResponseModel>(path,formData,{
      reportProgress: true,
      responseType: 'json',
    });
  }
}
