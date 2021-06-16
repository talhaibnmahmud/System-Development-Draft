import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { HouseService } from 'src/app/services/house.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchFormGroup: FormGroup = new FormGroup({});

  relatedDistricts: any[] = [];
  divisions: any[] = [];
  districtst: any[] = [];

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _houseService: HouseService,
  ) { }

  ngOnInit(): void {
    this.listAreas();
  }

  private listAreas() {
    this._houseService.getAreas().subscribe(
      data => {
        for (const [key, value] of Object.entries(data)) {
          this.divisions.push(key);
          this.relatedDistricts.push(value);
        }

        console.log(data);
      }
    );
  }

  onSubmit(): void {
    console.log('Submitting form');
  }

}
