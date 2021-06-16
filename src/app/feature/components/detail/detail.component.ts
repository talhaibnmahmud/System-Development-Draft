import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { House } from 'src/app/helper/house';
import { HouseService } from 'src/app/services/house.service';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  houseID = -1;
  divisionID = -1;
  districtID = -1;
  house: House | null = null;

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _houseService: HouseService
  ) { }

  ngOnInit(): void {
    this.houseID = Number(this._route.snapshot.paramMap.get('id'));
    // console.log(this.houseID);
    this.houseDetail();
    // this.division();
  }

  houseDetail(): void {
    this._houseService.getHouseDetail(this.houseID).subscribe(
      data => {
        this.house = { ...data };
        // console.log(data);
        // console.log(this.house);
      }
    );
  }

  division(): void {
    if (this.house) {
      this.divisionID = Number(this.house.division);
      // console.log(this.divisionID);
    }
  }
}
