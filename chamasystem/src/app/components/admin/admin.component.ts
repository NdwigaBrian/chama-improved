import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  cycle: number = 1;
  round: number = 1;
  contributions: number[] = [];
  total: number = 0;
  dataReady = false;
  errorMessage: string = '';

  constructor(private http: HttpClient) {}

  getContributions() {
    // Reset data and error message
    this.dataReady = false;
    this.errorMessage = '';

    this.http.post<any>('http://localhost:3000/api/getContributions', { cycle: this.cycle, round: this.round })
      .subscribe(
        res => {
          // Expected response: { contributions: number[], total: number }
          this.contributions = res.contributions;
          this.total = res.total;
          this.dataReady = true;
        },
        err => {
          this.errorMessage = 'Error retrieving contributions. Please verify your inputs.';
          console.error(err);
        }
      );
    }
}
