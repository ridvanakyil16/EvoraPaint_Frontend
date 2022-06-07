import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import {AuthService} from "../../services/auth.service";
import {ActivatedRoute, ResolveEnd, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {CategoryService} from "../../services/category.service";
import {Category} from "../../models/category";
import {CategoryTranslation} from "../../models/categoryTranslation";
import {LanguageService} from "../../services/language.service";
import {Language} from "../../models/language";
import {GlobalVariable} from "../../models/global";
import {BehaviorSubject, Observable} from "rxjs";
import {formatNumber} from "@angular/common";
import {HomeSectionComponent} from "../home-section/home-section.component";

function stick() {
  window.addEventListener("scroll", function(){
    var navbar = document.querySelector(".navbar");
    navbar?.classList.toggle("sticky", window.scrollY >0);
  })
}

function stickMobile() {
  window.addEventListener("scroll", function(){
    var navbar = document.querySelector(".section-navbar-mobile");
    navbar?.classList.toggle("sticky", window.scrollY >0);
  })
}

function name() {
  $('.click-icon').click(function(){
    if($("#navbar-mobile").hasClass(".active")){
      $("#navbar-mobile").removeClass(".active")
      $(".mobile-menu").hide(400)
    }
    else{
      $("#navbar-mobile").addClass(".active")
      $(".mobile-menu").show(400)
    }
  })
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  apiUrl = GlobalVariable.BASE_URL

  userIsAdmin: boolean;
  isLoggedIn: boolean = false
  categories : CategoryTranslation[];
  languages : Language[];
  array : Language[];
  language: Language;
  activeLanguage: object;
  link:string

  constructor(
    private authService:AuthService,
    private router:Router,
    private toastrService:ToastrService,
    private activatedRoute:ActivatedRoute,
    private categoryService:CategoryService,
    private languageService: LanguageService,
  ) { }

  ngOnInit(): void {
    name()
    stick()
    stickMobile()
    this.getLanguages()

    if(localStorage.getItem("langName")){
      console.log(JSON.parse(String(localStorage.getItem("langName"))))
      this.languageService.setLanguageName(JSON.parse(String(localStorage.getItem("langName"))))
    }

    this.languageService.getLanguageName().subscribe((response) => {
      this.activeLanguage = response
      localStorage.setItem("langName",JSON.stringify(this.activeLanguage))
      this.getCategories()
    })

    if(localStorage.getItem("Token")){
      this.authService.setUserIsAdmin(true)
    }
    this.authService.getUserIsAdmin().subscribe((response) => {
      this.userIsAdmin = response;
    });
    this.router.events.subscribe((routerData) => {
      if(routerData instanceof ResolveEnd){
        if(routerData.url === '/about-us' || routerData.url === '/kvkk' || routerData.url === '/sustainability'){
          $(document).ready(function(){
            $('.nav-link').css({'color': 'yellow'});
          });
        }
        else{
          $(document).ready(function(){
            $('.nav-link').css({'color': '#000'});
          });
        }
      }
    })
  }

  logout(){
    localStorage.removeItem("Token")
    this.authService.setUserIsAdmin(false)
    this.toastrService.error("Çıkış Yapıldı")
    this.router.navigateByUrl("/")
  }

  getCategories(){
    this.categoryService.getAllCategoryByLangId(Object.values(this.activeLanguage)[0]).subscribe(response => {
        this.categories = response.data
    })
  }

  getLanguages(){
    this.languageService.getLanguages().subscribe(response =>{
      this.languages = response.data;
    })
  }

  getImagePath(path:string){
    return this.apiUrl + path;
  }

   // setLanguageId(languageId:number){
   //    localStorage.setItem("langId",languageId.toString())
   //    this.languageService.setLanguageId(languageId)
   // }

  setLanguageId(languageId:number){
      if($("#flag-img").hasClass("active")){
        $("#flag-img").removeClass("active")
        $("#flag-img").css({
          "height" : "50px",
          "background-color" : "transparent"
        });
      }
      else{
        $("#flag-img").addClass("active")
        $("#flag-img").css({
          "height" : "250px",
          "background-color" : "#38D432"
        });
      }

      if(JSON.parse(String(localStorage.getItem("langName"))).id != languageId){
        let rest = this.languages.filter(x => x.id !== languageId)
        let selected = this.languages.find(x => x.id == languageId)!

        this.languages = [selected  , ...rest]

        localStorage.setItem("langName",JSON.stringify(selected))
        this.languageService.setLanguageName(selected)
      }
      // this.array.push(<Language>this.activeLanguage)
      // this.array.push(...this.languages.filter(x => x.id != languageId))
      // this.languages = this.array
      // console.log(this.array,"array")
  }
}
