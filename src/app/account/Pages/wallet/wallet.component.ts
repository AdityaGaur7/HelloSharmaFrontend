import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from '../../MainComp/nav2/nav.component';
import { FooterComponent } from '../../MainComp/footer/footer.component';

@Component({
  selector: 'app-wallet',
  standalone: true,
  imports: [CommonModule, NavComponent, FooterComponent],
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css'],
})
export class WalletComponent implements OnInit {
  balance = 1500;
  transactions = [
    {
      id: 'TXN001',
      date: '2024-01-25',
      type: 'Credit',
      amount: 1000,
      description: 'Wallet Recharge',
    },
    {
      id: 'TXN002',
      date: '2024-01-26',
      type: 'Debit',
      amount: 500,
      description: 'Astrology Consultation',
    },
    // Add more transactions as needed
  ];

  constructor() {}

  ngOnInit(): void {}
}
