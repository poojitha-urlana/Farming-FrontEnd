import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

interface DiseaseTreatment {
    symptoms?: string;
    severity?: string;
    causes?: string;
    treatment?: string;
    prevention?: string;
    recommended_pesticide?: string;
    organic_treatment?: string;
    message?: string;
  }
  
  interface PredictionResult {
    prediction: string;
    confidence: string;
    treatment: DiseaseTreatment;
  }

@Component({
    selector: 'app-treatment',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './treatment.component.html',
    styleUrls: ['./treatment.component.css']
})
export class TreatmentComponent {
    prediction: string = '';
    confidence: string = '';
    treatment: DiseaseTreatment | null = null;
    uploadedImageUrl: string = '';

    constructor(private location: Location) {
        const navigationState = this.location.getState() as any;
        
        console.log('Navigation State:', navigationState); // Debug log
        
        if (navigationState) {
            this.prediction = navigationState.prediction || 'Unknown';
            this.confidence = navigationState.confidence || '0%';
            this.treatment = navigationState.treatment || null;
            this.uploadedImageUrl = navigationState.imageUrl || '';
            
            console.log('Component Initialized with:', { // Debug log
                prediction: this.prediction,
                confidence: this.confidence,
                treatment: this.treatment,
                imageUrl: this.uploadedImageUrl
            });
        }
    }

    goBack(): void {
        this.location.back();
    }

    async downloadReport(): Promise<void> {
        try {
            const element = document.getElementById('treatment-report');
            if (!element) {
                console.error('Report element not found');
                return;
            }

            // Add loading indicator
            element.classList.add('generating-pdf');

            const canvas = await html2canvas(element, {
                scale: 2,
                logging: true,
                useCORS: true,
                allowTaint: true,
                scrollX: 0,
                scrollY: 0,
                windowWidth: element.scrollWidth,
                windowHeight: element.scrollHeight
            });

            // Remove loading indicator
            element.classList.remove('generating-pdf');

            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgWidth = 210; // A4 width in mm
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, imgWidth, imgHeight);
            pdf.save(`${this.prediction.replace(/\s+/g, '_')}_treatment_report.pdf`);
        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Failed to generate PDF. Please try again.');
        }
    }

    hasTreatmentData(): boolean {
        if (!this.treatment) return false;
        
        return (
            (this.treatment.symptoms?.trim() ?? '') !== '' ||
            (this.treatment.severity?.trim() ?? '') !== '' ||
            (this.treatment.causes?.trim() ?? '') !== '' ||
            (this.treatment.treatment?.trim() ?? '') !== '' ||
            (this.treatment.prevention?.trim() ?? '') !== '' ||
            (this.treatment.recommended_pesticide?.trim() ?? '') !== '' ||
            (this.treatment.organic_treatment?.trim() ?? '') !== ''
        );
    }

    getTreatmentField(field: keyof DiseaseTreatment): string {
        if (!this.treatment || !this.treatment[field]) return 'Not available';
        return this.treatment[field] as string;
    }
}