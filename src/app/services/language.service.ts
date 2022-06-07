import { Injectable } from '@angular/core';
import {GlobalVariable} from "../models/global";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {ListResponseModel} from "../models/listResponseModel";
import {CategoryTranslation} from "../models/categoryTranslation";
import {Language} from "../models/language";

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  apiUrl = GlobalVariable.BASE_URL;

  public storageLanguageName = new BehaviorSubject<object>({id:1 ,name: "tr"});

  constructor(private httpClient:HttpClient) {}

  getLanguages():Observable<ListResponseModel<Language>>{
    let path = this.apiUrl + "api/languages/getall";
    return this.httpClient.get<ListResponseModel<Language>>(path);
  }

  setLanguageName(languageId: object) {
    this.storageLanguageName.next(languageId);
  }

  getLanguageName(): Observable<object> {
    return this.storageLanguageName.asObservable()
  }
}
