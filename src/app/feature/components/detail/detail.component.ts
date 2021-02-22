import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Houselist } from 'src/app/helper/houselist';
import { HouseService } from 'src/app/services/house.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  houseID!: number;
  house!: Houselist;

  constructor(
    private route: ActivatedRoute,
    private houseService: HouseService
  ) { }

  ngOnInit(): void {
    this.houseID = Number(this.route.snapshot.paramMap.get('id'));
    console.log(this.houseID);
    this.houseDetail();
  }

  houseDetail(): void {
    this.houseService.getHouseDetail(this.houseID).subscribe(
      data => {
        this.house = data[0];
        console.log(this.house);
      }
    );
  }
}
