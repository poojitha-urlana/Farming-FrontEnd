import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PredictionService {

  private apiUrl = 'http://localhost:8899/api/crop/predict';  // Spring Boot API URL

  constructor(private http: HttpClient) { }

  // Method to send the image file for prediction
  predictDisease(imageFile: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('image', imageFile);

    // HTTP headers are automatically set for form-data
    return this.http.post(this.apiUrl, formData)
      .pipe(
        catchError(this.handleError)  // Error handling
      );
  }

  // Error handling
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error occurred
      console.error('An error occurred:', error.error.message);
    } else {
      // Backend returned an unsuccessful response code
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError('Something went wrong; please try again later.');
  }
}