import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppointmentsComponent } from '../appointments/appointments.component';
import { ChatHistoryComponent } from '../chat-history/chat-history.component';
import { EarningsComponent } from '../earnings/earnings.component';
import { AstrologerDashboardService } from '../../services/astrologer-dashboard.service';
import { AstrologerProfileComponent } from '../astrologer-profile/astrologer-profile.component';

@Component({
  selector: 'app-astrologer-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    AppointmentsComponent,
    ChatHistoryComponent,
    EarningsComponent,
    AstrologerProfileComponent,
  ],
  templateUrl: './astrologer-dashboard.component.html',
  styleUrls: ['./astrologer-dashboard.component.css'],
})
export class AstrologerDashboardComponent implements OnInit {
  activeSection: string = 'overview';
  astrologerData: any = null;

  constructor(private astrologerService: AstrologerDashboardService) {}

  ngOnInit(): void {
    this.loadAstrologerData();
  }

  private loadAstrologerData(): void {
    this.astrologerService.getAstrologerProfile().subscribe({
      next: (data) => {
        this.astrologerData = data;
      },
      error: (error) => {
        console.error('Error loading astrologer data:', error);
      },
    });
  }
}
