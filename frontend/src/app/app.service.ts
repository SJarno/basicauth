import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthResponse } from './models/AuthResponse';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  user?: AuthResponse;
  authenticated: boolean = false;
  url: string = environment.baseUrl;

  constructor(private http: HttpClient) { }


  authenticate(credentials: any, callback: any): Observable<any> {
    const headers = new HttpHeaders(credentials ? {
      authorization: 'Basic ' + window.btoa(credentials.username + ':' + credentials.password)
    } : {});

    return this.http.get<AuthResponse>(`${this.url}user`, { headers: headers }).pipe(
      tap(response => {
        console.log('The authresponse == ', response);
      }),
      map((response: AuthResponse) => {
        this.user = response;
        return response;
      }),
      catchError(this.handleError<any>('Error in auth!')));
  }
  /* isInStorage() {
    const user = sessionStorage.getItem('user');
    return user ? true : false;
  } */
  logout(): boolean {
    this.http.post(`${this.url}logout`, {}).pipe(tap(logoutResult => {
      console.log('Logout result in response == ', logoutResult)
    }),
      catchError(this.handleError<any>('Logging out error')))
      .subscribe(() => {
        this.user = undefined;
      });
    return false;
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      //Log to console
      //if (error.status != 401) {
        console.error('Error occured == ', error);
        //console.log('Logging the actual message', error.message);
        console.log(`${operation} failed: ${error.message}`)
      //}
      return of(result as T);
    };
  }
}
