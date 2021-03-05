import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { House } from 'src/app/helper/house';

@Injectable({
  providedIn: 'root'
})
export class HouseService {
  private baseURL = 'http://127.0.0.1:8000/house/';
  private divisionURL = 'http://127.0.0.1:8000/areas/division/';
  // private detailURL = `${this.baseURL}house/`;
  private houselist: any;
  private houseDetail: any;
  private division: any;

  constructor(private httpClient: HttpClient) { }

  getHouseList(): Observable<House[]> {
    this.houselist = this.httpClient.get(this.baseURL).pipe(
      retry(3),
      catchError(this.handleError)
    );

    return this.houselist;
    // return this.httpClient.get<GetResponse>(this.baseURL).pipe(
    //   map(response => response.houses),
    // );
  }

  getHouseDetail(id: number): Observable<House> {
    this.houseDetail = this.httpClient.get(`${this.baseURL}${id}/`).pipe(
      // mergeMap((house: any)=> this.httpClient.get(`${this.divisionURL}${house.division}/`))
    );
    this.division = this.httpClient.get(`${this.divisionURL}${this.houseDetail.division}/`);
    // console.log(this.division);
    // console.log(this.houseDetail);
    return this.houseDetail;
  }

  getDivision(id: number): Observable<any> {
    return this.httpClient.get(`${this.divisionURL}${id}/`).pipe();
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.log(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}


