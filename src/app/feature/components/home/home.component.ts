import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

import { House } from 'src/app/helper/house';
import { HouseService } from 'src/app/services/house.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  houses: House[] = [];
  previous: string | null = null;
  next: string | null = null;

  query = '';

  constructor(private readonly _houseService: HouseService) { }

  ngOnInit(): void {
    this.listHouse();
  }

  listHouse(url?: string | null): void {
    if (url) {
      this._houseService.getHouseList(url).subscribe(
        data => {
          this.houses = data.results;
          this.previous = data.previous;
          this.next = data.next;
          // console.log(data);
        }
      );

      return;
    }
    this._houseService.getHouseList().subscribe(
      data => {
        this.houses = data.results;
        this.previous = data.previous;
        this.next = data.next;
        // console.log(data);
      }
    );
  }

  searchHandler(form: NgForm) {
    if (form.valid) {
      try {
        // console.log(form.value);

        this._houseService.searchHouse(form.value['query']).subscribe(
          data => {
            this.houses = data.results;
            this.previous = data.previous;
            this.next = data.next;
            // console.log(data);
          }
        );
      } catch (error) {
        console.log(error);
      }
    }
  }
}
