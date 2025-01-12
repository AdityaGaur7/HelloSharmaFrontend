import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstrologerDashboardService } from '../../services/astrologer-dashboard.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-earnings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="earnings-container">
      <div class="earnings-header">
        <div class="earnings-summary">
          <h3>Total Earnings</h3>
          <h2 class="amount">₹{{ totalEarnings }}</h2>
        </div>
        <div class="period-selector">
          <select class="form-select" [(ngModel)]="selectedPeriod">
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
        </div>
      </div>

      <div class="earnings-chart">
        <!-- Add chart component here -->
      </div>

      <div class="recent-transactions">
        <h4>Recent Transactions</h4>
        <div class="transaction-list">
          <div
            *ngFor="let transaction of transactions"
            class="transaction-item"
          >
            <div class="transaction-info">
              <span class="transaction-type">{{ transaction.type }}</span>
              <span class="transaction-date">{{
                transaction.date | date
              }}</span>
            </div>
            <span class="transaction-amount">₹{{ transaction.amount }}</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .earnings-container {
        padding: 1rem;
      }
      .earnings-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
      }
      .amount {
        font-size: 2.5rem;
        font-weight: 600;
        color: #4c1d95;
      }
      .transaction-list {
        margin-top: 1rem;
      }
      .transaction-item {
        background: white;
        padding: 1rem;
        border-radius: 0.5rem;
        margin-bottom: 0.5rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .transaction-amount {
        font-weight: 600;
      }
    `,
  ],
})
export class EarningsComponent implements OnInit {
  totalEarnings: number = 0;
  selectedPeriod: string = 'month';
  transactions: any[] = [];

  constructor(private astrologerService: AstrologerDashboardService) {}

  ngOnInit(): void {
    this.loadEarnings();
  }

  loadEarnings(): void {
    this.astrologerService.getEarnings().subscribe({
      next: (data) => {
        this.totalEarnings = data.total;
        this.transactions = data.transactions;
      },
      error: (error) => {
        console.error('Error loading earnings:', error);
      },
    });
  }
}
