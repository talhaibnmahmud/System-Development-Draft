import { Component, OnInit } from '@angular/core';
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
  // houselist: any;

  constructor(private houseService: HouseService) { }

  ngOnInit(): void {
    // this.listHouse();
    this.listHouse();
  }

  listHouse(url?: string | null): void {
    if(url) {
      this.houseService.getHouseList(url).subscribe(
        data => {
          this.houses = data.results;
          this.previous = data.previous;
          this.next = data.next;
          console.log(data);
        }
      );

      return;
    }
    this.houseService.getHouseList().subscribe(
      data => {
        this.houses = data.results;
        this.previous = data.previous;
        this.next = data.next;
        console.log(data);
      }
    );
  }

  // listHouse(): void {
  //   this.houseService.getHouseList().subscribe(
  //     data => {
  //       this.houses = [...data];
  //     }
  //   );
  // }
}
