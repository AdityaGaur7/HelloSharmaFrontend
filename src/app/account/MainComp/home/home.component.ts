import { Component } from '@angular/core';

import { FooterComponent } from '../footer/footer.component';
import { MainComponent } from '../main/main.component';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from '../nav2/nav.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FooterComponent,NavComponent,MainComponent,RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
