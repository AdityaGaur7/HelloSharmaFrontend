import { Component } from '@angular/core';
import { PagetitleComponent } from '../../../shared/ui/pagetitle/pagetitle.component';

@Component({
  selector: 'app-starter',
  templateUrl: './starter.component.html',
  styleUrls: ['./starter.component.scss'],
  standalone:true,
  imports:[PagetitleComponent]
})

/**
 * Utility starter component
 */
export class StarterComponent{}
