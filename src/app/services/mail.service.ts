import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Mail} from "../models/mail";
import {Observable} from "rxjs";
import {GlobalVariable} from "../models/global";
import {ResponseModel} from "../models/responseModel";


@Injectable({
  providedIn: 'root'
})
export class MailService {

  apiUrl = GlobalVariable.BASE_URL;

  constructor(
    private httpClient:HttpClient
  ) { }

  mailAdd(mail:Mail):Observable<ResponseModel>{
    let path = this.apiUrl + "api/Mails/add"
    return this.httpClient.post<ResponseModel>(path,mail)
  }
}
