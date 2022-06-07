import { Component } from '@angular/core';
import {NavigationEnd, Router } from '@angular/router';
import {TranslateService} from "@ngx-translate/core";
import {LanguageService} from "./services/language.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'EvoraPaintFrontend';
  constructor(
    public translate: TranslateService,
    private languageService : LanguageService,
    private router: Router
  ) {
    translate.addLangs(['tr', 'en', 'de', 'fr']);
  }
  ngOnInit() {
    /*this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });*/

    this.languageService.getLanguageName().subscribe((response) => {
      this.translate.setDefaultLang(Object.values(response)[1]);
    })
  }
}

