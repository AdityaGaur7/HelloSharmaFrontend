import { Component } from '@angular/core';
import { ClientCompComponent } from '../client-comp/client-comp.component';
import { ProfileCompComponent } from '../profile-comp/profile-comp.component';
import { CommonModule } from '@angular/common';
import { AstrocompComponent } from '../astrocomp/astrocomp.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    ProfileCompComponent,
    AstrocompComponent,
    ClientCompComponent,
  ],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  activeSection: string = 'profile';
  isSidebarVisible: boolean = true;

  constructor() {}

  toggleSidebar(): void {
    this.isSidebarVisible = !this.isSidebarVisible;
    document.querySelector('.sidebar')?.classList.toggle('show');
  }
}
