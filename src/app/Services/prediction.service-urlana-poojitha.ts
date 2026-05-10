import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

interface DiseaseTreatment {
    symptoms: string;
    severity: string;
    causes: string;
    treatment: string;
    prevention: string;
    recommended_pesticide: string;
    organic_treatment: string;
    message?: string;  // Optional for cases when no treatment found
}

interface PredictionResponse {
    prediction: string;
    confidence: string;
    treatment: DiseaseTreatment;
}

@Injectable({
    providedIn: 'root'
})
export class PredictionService {
    private apiUrl = 'http://localhost:5001/predict';  // Flask API endpoint

    constructor(private http: HttpClient) { }

    /**
     * Predict disease from an image file
     * @param imageFile The image file to analyze
     * @returns Observable with complete prediction results including treatment details
     */
    predictDisease(imageFile: File): Observable<PredictionResponse> {
        const formData = new FormData();
        formData.append('image', imageFile, imageFile.name);

        return this.http.post<PredictionResponse>(this.apiUrl, formData)
            .pipe(
                catchError(this.handleError)
            );
    }

    /**
     * Enhanced error handling
     * @param error HttpErrorResponse
     * @returns Error message observable
     */
    private handleError(error: HttpErrorResponse): Observable<never> {
        let errorMessage: string;

        if (error.error instanceof ErrorEvent) {
            // Client-side or network error
            errorMessage = `Network error: ${error.error.message}`;
        } else {
            // Backend returned unsuccessful response
            switch (error.status) {
                case 0:
                    errorMessage = 'Server unavailable. Please check your connection.';
                    break;
                case 400:
                    errorMessage = 'Invalid request. Please check your image file.';
                    break;
                case 413:
                    errorMessage = 'Image too large (max 5MB allowed).';
                    break;
                case 500:
                    errorMessage = error.error?.error || 'Server processing error.';
                    break;
                default:
                    errorMessage = `Unexpected error: ${error.status} - ${error.message}`;
            }
        }

        console.error('PredictionService error:', errorMessage);
        return throwError(() => new Error(errorMessage));
    }
}






// import { Injectable } from '@angular/core';
// import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// import { catchError } from 'rxjs/operators';
// import { throwError, Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class PredictionService {

//   private apiUrl = 'http://localhost:8899/api/crop/predict';  // Spring Boot API URL

//   constructor(private http: HttpClient) { }

//   // Method to send the image file for prediction
//   predictDisease(imageFile: File): Observable<any> {
//     const formData: FormData = new FormData();
//     formData.append('image', imageFile);

//     // HTTP headers are automatically set for form-data
//     return this.http.post(this.apiUrl, formData)
//       .pipe(
//         catchError(this.handleError)  // Error handling
//       );
//   }

//   // Error handling
//   private handleError(error: HttpErrorResponse) {
//     if (error.error instanceof ErrorEvent) {
//       // Client-side or network error occurred
//       console.error('An error occurred:', error.error.message);
//     } else {
//       // Backend returned an unsuccessful response code
//       console.error(
//         `Backend returned code ${error.status}, ` +
//         `body was: ${error.error}`);
//     }
//     return throwError('Something went wrong; please try again later.');
//   }
// }