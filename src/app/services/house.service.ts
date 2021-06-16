import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';

import { House } from 'src/app/helper/house';
import { District } from '../helper/district';
import { Division } from '../helper/division';

@Injectable({
  providedIn: 'root'
})
export class HouseService {
  private readonly baseURL = 'http://127.0.0.1:8000/house/';
  private readonly areasURL = 'http://127.0.0.1:8000/areas/all/';
  private readonly divisionURL = 'http://127.0.0.1:8000/areas/division/';
  private readonly districtURL = 'http://127.0.0.1:8000/areas/district/';

  private houselist: any;
  private houseDetail: any;
  private areas: any;
  private divisionList: any;
  private division: any;
  private districtList: any;

  constructor(private readonly httpClient: HttpClient) { }

  getHouseList(url?: string | null): Observable<any> {
    const limit = 5;

    if (url) {
      this.houselist = this.httpClient.get(url).pipe(
        retry(3),
        // map(),
        catchError(this.handleError)
      );

      return this.houselist;
    }
    this.houselist = this.httpClient.get(`${this.baseURL}?limit=${limit}`).pipe(
      retry(3),
      // map(),
      catchError(this.handleError)
    );

    return this.houselist;
  }

  getHouseDetail(id: number): Observable<House> {
    this.houseDetail = this.httpClient.get(`${this.baseURL}${id}/`).pipe(
    );
    return this.houseDetail;
  }

  createHouse(form: any): Observable<House> {
    const token = localStorage.getItem('token');
    this.houseDetail = this.httpClient.post(this.baseURL, form, { headers: { 'Authorization': `Token ${token}` } });

    return this.houseDetail;
  }

  updateHouse(id: number, form: any): Observable<House> {
    const url = `${this.baseURL}${id}/`;
    const token = localStorage.getItem('token');
    this.houseDetail = this.httpClient.patch(url, form, { headers: { 'Authorization': `Token ${token}` } });

    return this.houseDetail;
  }

  deleteHouse(id: number): Observable<{}> {
    const url = `${this.baseURL}${id}/`;
    const token = localStorage.getItem('token');

    return this.httpClient.delete(url, { headers: { 'Authorization': `Token ${token}` } });
  }

  searchHouse(query: string | null): Observable<any> {
    const searchURL = `${this.baseURL}?search=${query}`;

    return this.httpClient.get(searchURL).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  advancedSearch(): Observable<any> {
    const searchURL = `${this.baseURL}?`;

    return this.httpClient.get(searchURL).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  getAreas(): Observable<any> {
    this.areas = this.httpClient.get(this.areasURL).pipe();

    return this.areas;
  }

  getDivision(id: number): Observable<any> {
    return this.httpClient.get(`${this.divisionURL}${id}/`).pipe();
  }

  getAllDivisions(): Observable<Division[]> {
    this.divisionList = this.httpClient.get(this.divisionURL).pipe();

    return this.divisionList;
  }

  getAllDistricts(): Observable<District[]> {
    this.districtList = this.httpClient.get(this.districtURL).pipe();

    return this.districtList;
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


