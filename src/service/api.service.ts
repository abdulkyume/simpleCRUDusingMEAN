import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl: string = 'http://localhost:4000/api';
  headers = new HttpHeaders().set('Content-Type','application/json');
  constructor(private http:HttpClient) { }

  //create start
  createEmployee(data:any): Observable<any>{
    let url = `${this.baseUrl}/create`;
    return this.http.post(url, data).pipe(catchError(this.errorMgmt));
  }
  //create end

  //get all employee start
  getEmployees(){
    return this.http.get(`${this.baseUrl}`);
  }
  //get all employee end

  //get one employee start
  getEmployee(id:any): Observable<any> {
    let url = `${this.baseUrl}/read/${id}`;
    return this.http.get(url, { headers: this.headers }).pipe(
      map((res: any) => {
        return res || {};
      }),
      catchError(this.errorMgmt)
    );
  }
  //get one employee end

  //update employee start
  updateEmployee(id:any, data:any): Observable<any> {
    let url = `${this.baseUrl}/update/${id}`;
    return this.http
      .put(url, data, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }
  //update employee end

  //delete employee start
  deleteEmployee(id:any): Observable<any> {
    let url = `${this.baseUrl}/delete/${id}`;
    return this.http
      .delete(url, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }
  //delete employee end

  //error handling start
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
  //error handling end
}
