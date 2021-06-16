import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { House } from 'src/app/helper/house';
import { HouseService } from 'src/app/services/house.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {

  houseID = -1;
  divisionID = -1;
  districtID = -1;
  house: House | null = null;

  constructor(
    private readonly _router: Router,
    private readonly _location: Location,
    private readonly _route: ActivatedRoute,
    private readonly _houseService: HouseService,
  ) { }

  ngOnInit(): void {
    this.houseID = Number(this._route.snapshot.paramMap.get('id'));
    this.houseDetail();
  }

  houseDetail(): void {
    this._houseService.getHouseDetail(this.houseID).subscribe(
      data => {
        this.house = { ...data };
      }
    );
  }

  handleSubmit(): void {
    this._houseService.deleteHouse(this.houseID).subscribe();
    this._router.navigateByUrl('');
  }

  goBack(): void {
    this._location.back();
  }

}
