import { Component, OnInit } from '@angular/core';
import {OwlOptions} from "ngx-owl-carousel-o";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  owlOptions_aboutus: OwlOptions = {
    margin: 0,
    nav: false,
    dots: false,
    responsive: {
      0: {
        items: 1,
      }
    }
  };

  constructor() { }

  ngOnInit(): void {

  }


}
