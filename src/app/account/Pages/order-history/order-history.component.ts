import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from '../../MainComp/nav2/nav.component';
import { FooterComponent } from '../../MainComp/footer/footer.component';

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [CommonModule, NavComponent, FooterComponent],
  templateUrl: './order-history.component.html',
  styleUrls: [],
})
export class OrderHistoryComponent implements OnInit {
  orders = [
    {
      id: '#ORD001',
      date: '2024-01-15',
      type: 'Astrology Consultation',
      amount: 1100,
      status: 'Completed',
    },
    {
      id: '#ORD002',
      date: '2024-01-20',
      type: 'Pooja Booking',
      amount: 2100,
      status: 'Scheduled',
    },
    // Add more orders as needed
  ];

  constructor() {}

  ngOnInit(): void {}
}
