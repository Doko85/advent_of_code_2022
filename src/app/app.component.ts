import { Component } from '@angular/core';
import { AdventOfCodeDay } from './models/advent_of_code_day.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  days: Array<AdventOfCodeDay>;

  constructor() {
    this.days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24].map((day) => ({
      day,
      active: day <= new Date().getDay(),
    }));
  }
}
