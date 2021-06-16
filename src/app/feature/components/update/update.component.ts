import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { House } from 'src/app/helper/house';
import { HouseService } from 'src/app/services/house.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  updateHouseFormGroup: FormGroup = new FormGroup({});
  form: any;

  // divisions: Observable<Division[]> | undefined;
  // districts: Observable<District[]> | undefined;
  houseID = -1;
  house: House | null = null;

  relatedDistricts: any[] = [];
  divisions: any[] = [];
  districtst: any[] = [];

  constructor(
    private readonly _router: Router,
    private readonly _route: ActivatedRoute,
    private readonly _formBuilder: FormBuilder,
    private readonly _houseService: HouseService,
  ) { }

  ngOnInit(): void {

    this.updateHouseFormGroup = this._formBuilder.group({
      address: this._formBuilder.group({
        title: ['', [Validators.required, Validators.maxLength(100)]],
        address: ['', [Validators.required, Validators.maxLength(100)]],
        district: [0, [Validators.required]],
        division: [0,],
      }),
      about: this._formBuilder.group({
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
      features: this._formBuilder.group({
        balcony: false,
        electricity_backup: false,
        service_elevator: false,
      }),
      description: this._formBuilder.group({
        description: ['', Validators.maxLength(300)],
      }),
    });

    this.listAreas();
    this.currentHouse();
    // this.listDivision();
    // this.listDistrict();

    this.houseID = Number(this._route.snapshot.paramMap.get('id'));
    this.houseDetail();
  }

  houseDetail(): void {
    this._houseService.getHouseDetail(this.houseID).subscribe(
      data => {
        this.house = { ...data };
        // console.log(data);
        // console.log(this.house);

        this.updateHouseFormGroup.get('address')?.patchValue({ title: this.house?.title });
        this.updateHouseFormGroup.get('address')?.patchValue({ address: this.house?.address });
        this.updateHouseFormGroup.get('address')?.patchValue({ division: this.house?.division });
        this.updateHouseFormGroup.get('address')?.patchValue({ district: this.house?.district });

        this.updateHouseFormGroup.get('about')?.patchValue({ type: this.house?.type });
        this.updateHouseFormGroup.get('about')?.patchValue({ price: this.house?.price });
        this.updateHouseFormGroup.get('about')?.patchValue({ area: this.house?.area });
        this.updateHouseFormGroup.get('about')?.patchValue({ beds: this.house?.beds });
        this.updateHouseFormGroup.get('about')?.patchValue({ baths: this.house?.baths });
        this.updateHouseFormGroup.get('about')?.patchValue({ kitchen: this.house?.kitchen });
        this.updateHouseFormGroup.get('about')?.patchValue({ drawing: this.house?.drawing });
        this.updateHouseFormGroup.get('about')?.patchValue({ dining: this.house?.dining });
        this.updateHouseFormGroup.get('about')?.patchValue({ parking_space: this.house?.parking_space });
        this.updateHouseFormGroup.get('about')?.patchValue({ elevators: this.house?.elevators });

        this.updateHouseFormGroup.get('features')?.patchValue({ balcony: this.house?.balcony });
        this.updateHouseFormGroup.get('features')?.patchValue({ electricity_backup: this.house?.electricity_backup });
        this.updateHouseFormGroup.get('features')?.patchValue({ service_elevator: this.house?.service_elevator });

        this.updateHouseFormGroup.get('description')?.patchValue({ description: this.house?.description });
      }
    );
  }

  private validation(min: number, max: number = 5): any {
    return [0, [Validators.min(min), Validators.max(max)]];
  }

  private currentHouse() {
    this.updateHouseFormGroup.get('address')?.valueChanges.pipe().subscribe(
      data => {
        this.districtst = this.relatedDistricts[Number(data.division) - 1];
      }
    );
  }

  private listAreas() {
    this._houseService.getAreas().subscribe(
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
      ...this.updateHouseFormGroup.get('address')?.value,
      ...this.updateHouseFormGroup.get('about')?.value,
      ...this.updateHouseFormGroup.get('features')?.value,
      ...this.updateHouseFormGroup.get('description')?.value,
      owner: 1,
    };

    console.table(this.form);
    console.log(this.updateHouseFormGroup.valid);

    if (this.updateHouseFormGroup.valid) {
      this._houseService.updateHouse(this.houseID, this.form).subscribe(
        data => console.log(data)
      );

      this._router.navigateByUrl(`/house/${this.houseID}`);
    }
  }

}
