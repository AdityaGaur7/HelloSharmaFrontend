
import { Component,OnInit } from '@angular/core';

import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [NgbAccordionModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css'
})
export class FaqComponent {
  constructor(private route:ActivatedRoute){}
  currentItem = 'FAQs';
  ngOnInit(): void {

    let id = this.route.snapshot.paramMap;
    console.log(id);
  }
}
