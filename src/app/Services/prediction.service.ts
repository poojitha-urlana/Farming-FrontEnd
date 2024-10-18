import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PredictionService {

  private baseUrl = 'http://localhost:8899/api/crop/predict';  // Spring Boot URL

  constructor(private http: HttpClient) { }

  // Method to upload image and get prediction
  predictDisease(image: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('image', image);

    // Expecting text response from the server
    return this.http.post(this.baseUrl, formData, { responseType: 'text' })
      .pipe(
        catchError(this.handleError)
      );
  }

  // Handle errors
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
