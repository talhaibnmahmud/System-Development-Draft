import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HouseService {
  private baseURL = 'http://127.0.0.1:8000/';
  private detailURL = `${this.baseURL}house/`;
  private houselist: any;
  private houseDetail: any;

  constructor(private httpClient: HttpClient) { }

  getHouseList(): Observable<any[]> {
    this.houselist = this.httpClient.get(this.baseURL).pipe();

    return this.houselist;
    // return this.httpClient.get<GetResponse>(this.baseURL).pipe(
    //   map(response => response.houses),
    // );
  }

  getHouseDetail(id: number): Observable<any[]> {
    this.houseDetail = this.httpClient.get(`${this.detailURL}${id}`).pipe();
    return this.houseDetail;
  }
}


