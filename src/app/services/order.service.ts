import { Injectable } from '@angular/core';
import {GlobalVariable} from "../models/global";
import {HttpClient} from "@angular/common/http";
import {Order} from "../models/order";
import { Observable } from 'rxjs';
import {ResponseModel} from "../models/responseModel";
import {Product} from "../models/product";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  apiUrl = GlobalVariable.BASE_URL;

  constructor(private httpClient : HttpClient) { }
}
