import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  form: any;

  // divisions: Observable<Division[]> | undefined;
  // districts: Observable<District[]> | undefined;
  relatedDistricts: any[] = [];
  divisions: any[] = [];
  districtst: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private houseService: HouseService
  ) { }

  ngOnInit(): void {
    this.createHouseFormGroup = this.formBuilder.group({
      address: this.formBuilder.group({
        title: ['', [Validators.required, Validators.maxLength(100)]],
        address: ['', [Validators.required, Validators.maxLength(100)]],
        district: [0, [Validators.required]],
        division: [0,],
      }),
      about: this.formBuilder.group({
        type: ['Apartment'],
        price: this.validation(0, 10000000),
        area: this.validation(0, 100000),
        beds: this.validation(1, 15),
        baths: this.validation(0, 10),
        kitchen: this.validation(0),
        drawing: this.validation(0),
        dining: this.validation(0),
        parking_space: this.validation(0),
        elevators: this.validation(0),
      }),
      features: this.formBuilder.group({
        balcony: false,
        electricity_backup: false,
        service_elevator: false,
      }),
      description: this.formBuilder.group({
        description: ['', Validators.maxLength(300)],
      }),
    });

    this.listAreas();

    this.currentHouse();
    // this.listDivision();
    // this.listDistrict();
  }

  private validation(min: number, max: number = 5): any {
    return [0, [Validators.min(min), Validators.max(max)]];
  }

  private currentHouse() {
    this.createHouseFormGroup.get('address')?.valueChanges.pipe().subscribe(
      data => {
        this.districtst = this.relatedDistricts[Number(data.division) - 1];
      }
    );
  }

  private listAreas() {
    this.houseService.getAreas().subscribe(
      data => {
        for (const [key, value] of Object.entries(data)) {
          this.divisions.push(key);
          this.relatedDistricts.push(value);
        }
      }
    );
  }

  onSubmit(): void {
    console.log('Submitting form');
    this.form = {
      ...this.createHouseFormGroup.get('address')?.value,
      ...this.createHouseFormGroup.get('about')?.value,
      ...this.createHouseFormGroup.get('features')?.value,
      ...this.createHouseFormGroup.get('description')?.value,
      owner: 1,
    };
    // console.log(this.createHouseFormGroup.get('address')?.value);
    // console.log(this.createHouseFormGroup.get('about')?.value);
    // console.log(this.createHouseFormGroup.get('features')?.value);
    // console.log(this.createHouseFormGroup.get('description')?.value);
    // console.log(this.createHouseFormGroup.value);
    console.table(this.form);
    console.log(this.createHouseFormGroup.valid);

    if (this.createHouseFormGroup.valid) {
      this.houseService.createHouse(this.form).subscribe(
        data => console.log(data)
      );
    }
  }

  // listDivision(): void {
  //   this.divisions = this.houseService.getAllDivisions();
  // }

  // listDistrict(): void {
  //   this.districts = this.houseService.getAllDistricts();
  // }

  // listRelatedDistrict(_$event: any): void {
  // }

}
