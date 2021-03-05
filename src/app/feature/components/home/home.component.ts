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
  
  houses: Observable<House[]> | null = null;
  // houselist: any;

  constructor(private houseService: HouseService) { }

  ngOnInit(): void {
    // this.listHouse();
    this.listHouse();
  }

  listHouse(): void {
    this.houses = this.houseService.getHouseList();
  }

  // listHouse(): void {
  //   this.houseService.getHouseList().subscribe(
  //     data => {
  //       this.houses = [...data];
  //     }
  //   );
  // }
}
