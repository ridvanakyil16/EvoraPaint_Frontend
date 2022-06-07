import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalVariable } from 'src/app/models/global'
import { Category } from '../models/category';
import { ListResponseModel } from '../models/listResponseModel';
import { ObjectResponseModel } from '../models/objectResponseModel';
import {CategoryTranslation} from "../models/categoryTranslation";


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  apiUrl = GlobalVariable.BASE_URL;

  constructor(private httpClient:HttpClient) { }

  getCategories():Observable<ListResponseModel<CategoryTranslation>>{
    let path = this.apiUrl + "api/categories/getall";
    return this.httpClient.get<ListResponseModel<CategoryTranslation>>(path);
  }
  getCategoryById(categoryId:number):Observable<ObjectResponseModel<Category>>{
    let path = this.apiUrl + "api/categories/getbyid?id=" + categoryId ;
    return this.httpClient.get<ObjectResponseModel<Category>>(path);
  }
  getAllCategoryByLangId(languageId:number):Observable<ListResponseModel<CategoryTranslation>>{
    let path = this.apiUrl + "api/categories/getallbylangid?langId=" + languageId ;
    return this.httpClient.get<ListResponseModel<CategoryTranslation>>(path);
  }
}
