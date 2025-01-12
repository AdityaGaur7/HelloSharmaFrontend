import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstrologerDashboardService } from '../../services/astrologer-dashboard.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="appointments-container">
      <div class="appointments-header">
        <h3>Upcoming Appointments</h3>
        <div class="filter-actions">
          <select class="form-select" [(ngModel)]="filterStatus">
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      <div class="appointments-list">
        <div *ngFor="let appointment of appointments" class="appointment-card">
          <div class="appointment-info">
            <img
              [src]="appointment.userImage || 'assets/default-avatar.png'"
              alt="User"
              class="user-avatar"
            />
            <div class="appointment-details">
              <h5>{{ appointment.userName }}</h5>
              <p class="text-muted">{{ appointment.date | date : 'medium' }}</p>
            </div>
          </div>
          <div class="appointment-actions">
            <span [class]="'badge ' + getStatusClass(appointment.status)">
              {{ appointment.status }}
            </span>
            <button
              class="btn btn-primary btn-sm"
              *ngIf="appointment.status === 'pending'"
            >
              Start Session
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .appointments-container {
        padding: 1rem;
      }
      .appointments-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
      }
      .appointment-card {
        background: white;
        padding: 1rem;
        border-radius: 0.5rem;
        margin-bottom: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      }
      .appointment-info {
        display: flex;
        align-items: center;
        gap: 1rem;
      }
      .user-avatar {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        object-fit: cover;
      }
      .appointment-actions {
        display: flex;
        align-items: center;
        gap: 1rem;
      }
    `,
  ],
})
export class AppointmentsComponent implements OnInit {
  appointments: any[] = [];
  filterStatus: string = 'all';

  constructor(private astrologerService: AstrologerDashboardService) {}

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments(): void {
    this.astrologerService.getAppointments().subscribe({
      next: (data) => {
        this.appointments = data;
      },
      error: (error) => {
        console.error('Error loading appointments:', error);
      },
    });
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-success';
      case 'pending':
        return 'bg-warning';
      case 'cancelled':
        return 'bg-danger';
      default:
        return 'bg-secondary';
    }
  }
}
