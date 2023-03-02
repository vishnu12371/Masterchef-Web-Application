import {Component, OnInit} from '@angular/core';
import { HomeComponent} from '../app/home/home.component'


@Component({
  selector: 'ngbd-rating-decimal',
  templateUrl: './rating-decimal.html',
  styles: [`
    .star {
      position: relative;
      display: inline-block;
      font-size: 3rem;
      color: #d3d3d3;
    }
    .full {
      color: red;
    }
    .half {
      position: absolute;
      display: inline-block;
      overflow: hidden;
      color: red;
    }
  `]
})
export class NgbdRatingDecimal  {
  constructor(private home :HomeComponent){}
  
  currentRate = this.home.getRating();

  currentViews = this.home.getView();

}
