import { Component, OnInit } from '@angular/core';
import {MailService} from "../../services/mail.service";
import {ToastrService} from "ngx-toastr";
import { Mail } from 'src/app/models/mail';
import  { FormGroup,FormBuilder, FormControl,Validators } from '@angular/forms'
import {error} from "jquery";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  isAdded : boolean = false;
  isNotAdded : boolean = false;
  formError : boolean = false;
  message : string;

  mailAddForm:FormGroup;

  constructor(
    private mailService:MailService,
    private toastrService:ToastrService,
    private formBuilder:FormBuilder
  ) { }

  ngOnInit(): void {
    this.mailAddForm = this.formBuilder.group({
      firstName: new FormControl(null , Validators.required),
      lastName: new FormControl(null , Validators.required),
      emailAddress: new FormControl(null , [Validators.required,Validators.email]),
      phone: new FormControl(null , Validators.required),
      message: new FormControl(null , Validators.required),
    })
  }

  mailAdd(){
    if(this.mailAddForm.valid){
      this.toastrService.success("Mail Gönderildi")
      this.mailService.mailAdd(this.mailAddForm.value).subscribe(response => {
        this.isAdded = true;
          setTimeout(()=>{
          this.isAdded = false;
          this.message = "";
          this.mailAddForm.reset();
        },1000);
      }, responseError => {
        if(responseError.error.Error && responseError.error.Error.length > 0){
          for (let i = 0 ; i < responseError.error.Error.length; i++){
            this.isNotAdded = true;
            this.message = responseError.error.Error[i].ErrorMessage;
          }
        }
      }
      )
    }else{
      this.formError = true;
      this.message = "Hatalı Form!";
      this.toastrService.error(this.message);
      setTimeout(()=>{
        this.formError = false;
        this.message = "";
      }, 3000)
    }
  }

}
