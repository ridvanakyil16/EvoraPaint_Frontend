import { Component, OnInit } from '@angular/core';
import {CategoryService} from "../../services/category.service";
import {CategoryTranslation} from "../../models/categoryTranslation";
import {LanguageService} from "../../services/language.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  categories : CategoryTranslation[];
  activeLanguage: object;

  constructor(
    private categoryService:CategoryService,
    private languageService: LanguageService
  ) { }

  ngOnInit(): void {
    if(localStorage.getItem("langName")){
      this.languageService.setLanguageName(JSON.parse(String(localStorage.getItem("langName"))))
    }

    this.languageService.getLanguageName().subscribe((response) => {
      this.activeLanguage = response
      this.getCategories()
    })
  }

  getCategories(){
    this.categoryService.getCategories().subscribe(response => {
      // @ts-ignore
      this.categoryService.getAllCategoryByLangId(this.activeLanguage.id).subscribe(response => {
        this.categories = response.data
      })
    })
  }
}
