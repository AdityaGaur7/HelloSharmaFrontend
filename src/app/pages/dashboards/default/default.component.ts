import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { emailSentBarChart, monthlyEarningChart } from './data';
import { ChartType } from './dashboard.model';
import { EventService } from '../../../core/services/event.service';
import { CommonModule } from '@angular/common';
import { PagetitleComponent } from '../../../shared/ui/pagetitle/pagetitle.component';
import { LoaderComponent } from '../../../shared/ui/loader/loader.component';
@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
  standalone:true,
  imports:[PagetitleComponent,LoaderComponent,CommonModule]
})

export class DefaultComponent{

}

