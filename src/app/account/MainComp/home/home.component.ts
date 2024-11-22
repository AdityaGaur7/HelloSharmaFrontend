import { Component } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { FooterComponent } from '../footer/footer.component';
import { MainComponent } from '../main/main.component';
import { RouterOutlet } from '@angular/router';
import { NaviComponent } from '../nav2/nav.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FooterComponent,NavComponent,MainComponent,RouterOutlet,NaviComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
