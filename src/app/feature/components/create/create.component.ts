import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { District } from 'src/app/helper/district';
import { Division } from 'src/app/helper/division';
import { HouseService } from 'src/app/services/house.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  createHouseFormGroup: FormGroup = new FormGroup({});

  divisions: Observable<Division[]> | undefined;
  districts: Observable<District[]> | undefined;

  constructor(
              private formBuilder: FormBuilder,
              private houseService: HouseService
              ) { }

  ngOnInit(): void {
    this.createHouseFormGroup = this.formBuilder.group({
      address: this.formBuilder.group({
        title: [''],
        address: [''],
        district: [''],
        division: ['']
      }),
      about: this.formBuilder.group({
        type: [''],
        price: 0,
        area: 0,
        bed: 0,
        shower: 0,
        kitchen: 0,
        drawing: 0,
        dining: 0,
        parking: 0,
        elevator: 0,
      })
    });

    this.listDivision();
    this.listDistrict();
  }

  onSubmit(): void {
    console.log('Submitting form');
    console.log(this.createHouseFormGroup.get('address')?.value);
    console.log(this.createHouseFormGroup.get('about')?.value);
  }

  listDivision(): void {
    this.divisions = this.houseService.getAllDivisions();
  }

  listDistrict(): void {
    this.districts = this.houseService.getAllDistricts();
  }

}
